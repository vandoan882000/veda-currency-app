import type { AppBridgeState, ClientApplication } from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';

export const checkHeadersForReauthorization = (headers: Headers, app: ClientApplication<AppBridgeState>) => {
  if (headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
    const authUrlHeader = headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url') || `/api/auth`;

    const redirect = Redirect.create(app);
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith('/') ? `https://${window.location.host}${authUrlHeader}` : authUrlHeader,
    );
  }
};
