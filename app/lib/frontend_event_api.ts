import { RudderAnalytics } from '@rudderstack/analytics-js/bundled';

const ANONYMOUS_ID_KEY = 'dtlp:analytics:anonymous-id';
const SESSION_KEY = 'dtlp:analytics:session';
const LOGIN_ATTEMPT_KEY = 'dtlp:analytics:login-attempt';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

const RUDDERSTACK_DATA_PLANE_PATH = '/events';
const RUDDERSTACK_WRITE_KEY =
  process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY ?? 'dtlp-frontend';

type SessionState = {
  id: string;
  lastActivityAt: number;
};

type LoginAttempt = {
  source: string;
  path: string;
  startedAt: string;
};

let analytics: RudderAnalytics | undefined;

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const getAnonymousId = () => {
  if (typeof window === 'undefined') return '';

  try {
    const storedId = window.localStorage.getItem(ANONYMOUS_ID_KEY);
    if (storedId) return storedId;

    const anonymousId = createId();
    window.localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId);
    return anonymousId;
  } catch {
    return createId();
  }
};

const getSession = (now: number) => {
  if (typeof window === 'undefined') {
    return { id: '', isNew: false };
  }

  try {
    const storedSession = window.sessionStorage.getItem(SESSION_KEY);
    const session = storedSession ? JSON.parse(storedSession) as SessionState : null;
    const isExpired = !session || now - session.lastActivityAt > SESSION_TIMEOUT_MS;
    const currentSession: SessionState = isExpired
      ? { id: createId(), lastActivityAt: now }
      : { ...session, lastActivityAt: now };

    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentSession));
    return { id: currentSession.id, isNew: isExpired };
  } catch {
    return { id: createId(), isNew: true };
  }
};

const getAnalytics = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  if (!analytics) {
    analytics = new RudderAnalytics();
    analytics.load(
      RUDDERSTACK_WRITE_KEY,
      `${window.location.origin}${RUDDERSTACK_DATA_PLANE_PATH}`,
      {
        // This deployment only uses RudderStack's event envelope and delivery
        // queue. Routing continues to be handled by the existing Firehose.
        getSourceConfig: () => ({
          source: {
            id: 'dtlp-browser',
            name: 'Datatech Learning Place browser',
            enabled: true,
            workspaceId: 'dtlp',
            config: {},
            destinations: [],
          },
        }),
        loadIntegration: false,
      },
    );
  }

  return analytics;
};

export const handleTrackEvent = async ({
  user_id,
  event_name,
  properties,
  path,
}: {
  user_id: string;
  path: string;
  event_name: string;
  properties: Record<string, unknown>;
}) => {
  const now = Date.now();
  const session = getSession(now);
  const enrichedProperties = {
    ...properties,
    analytics_schema_version: 1,
    anonymous_id: getAnonymousId(),
    session_id: session.id,
    is_session_start: session.isNew,
    client_event_id: createId(),
    client_event_at: new Date(now).toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('Skipping event post in development environment:', {
      user_id,
      path,
      event_name,
      properties: enrichedProperties,
    });
    return true;
  }

  const rudderAnalytics = getAnalytics();
  if (!rudderAnalytics) {
    return false;
  }

  try {
    rudderAnalytics.track(event_name, {
      ...enrichedProperties,
      // Keep these fields in the event properties so the ingestion Lambda can
      // preserve the existing event_data contract used after Firehose.
      user_id,
      path,
    });
    return true;
  } catch (error) {
    console.error(`Error tracking event '${event_name}':`, error);
    return false;
  }
};

export const trackLoginStarted = ({
  source,
  path,
}: {
  source: string;
  path: string;
}) => {
  const attempt: LoginAttempt = {
    source,
    path,
    startedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(LOGIN_ATTEMPT_KEY, JSON.stringify(attempt));
  } catch {
    // Storage may be unavailable in privacy-restricted browsers. The event can still be sent.
  }

  return handleTrackEvent({
    user_id: '',
    path,
    event_name: 'login_started',
    properties: { source },
  });
};

export const consumeLoginAttempt = (): LoginAttempt | null => {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(LOGIN_ATTEMPT_KEY);
    if (!value) return null;

    // Remove first so React remounts cannot emit duplicate login success events.
    window.localStorage.removeItem(LOGIN_ATTEMPT_KEY);
    return JSON.parse(value) as LoginAttempt;
  } catch {
    return null;
  }
};
