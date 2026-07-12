const ANONYMOUS_ID_KEY = 'dtlp:analytics:anonymous-id';
const SESSION_KEY = 'dtlp:analytics:session';
const LOGIN_ATTEMPT_KEY = 'dtlp:analytics:login-attempt';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

type SessionState = {
  id: string;
  lastActivityAt: number;
};

type LoginAttempt = {
  source: string;
  path: string;
  startedAt: string;
};

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

export const sendEventPostRequest = async (data?: unknown) => {
  try {
    // ローカル環境の場合はリクエストをスキップ
    if (process.env.NODE_ENV === 'development') {
      const request_body = JSON.stringify(data);
      console.log('Skipping event post in development environment:', request_body);
      return true;
    }

    const request_body = JSON.stringify(data);

    const response = await fetch('/events', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
      // オプショナルな data 引数を受け取り、body に設定
      body: request_body,
    });

    if (!response.ok) {
      console.error('Failed to post event:', response.status, response.statusText);
      const errorData = await response.text();
      console.error('Error details:', errorData);
      // エラーオブジェクトやメッセージを返すなど、より詳細なエラーハンドリングも可能
      throw new Error(`Failed to post event: ${response.statusText}`);
    }

    return true; // 成功したことを示す値を返す例

  } catch (error) {
    console.error('Error posting event:', error);
    // エラーを再スローするか、特定の値を返す
    throw error; // 呼び出し元でエラーを処理できるように再スロー
  }
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
  const eventData = {
    user_id,
    path,
    event_name,
    properties: {
      ...properties,
      analytics_schema_version: 1,
      anonymous_id: getAnonymousId(),
      session_id: session.id,
      is_session_start: session.isNew,
      client_event_id: createId(),
      client_event_at: new Date(now).toISOString(),
    },
  };

  try {
    await sendEventPostRequest(eventData);
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
