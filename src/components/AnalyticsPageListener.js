import { useEffect } from 'react';
import { useAnalytics } from '../api/analytics';
import { useRouter } from '../api/router';

export default function AnalyticsPageListener() {
  const { location } = useRouter();
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.pageview(location.pathname);
  }, [location.pathname]);

  return null;
}
