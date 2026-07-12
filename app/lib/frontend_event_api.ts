import { RudderAnalytics } from '@rudderstack/analytics-js/bundled';

const RUDDERSTACK_DATA_PLANE_PATH = '/events';
const RUDDERSTACK_WRITE_KEY =
  process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY ?? 'dtlp-frontend';

let analytics: RudderAnalytics | undefined;

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
  if (process.env.NODE_ENV === 'development') {
    console.log('Skipping event post in development environment:', {
      user_id,
      path,
      event_name,
      properties,
    });
    return true;
  }

  const rudderAnalytics = getAnalytics();
  if (!rudderAnalytics) {
    return false;
  }

  try {
    rudderAnalytics.track(event_name, {
      ...properties,
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
