import type { ProviderProps as AppBridgeProviderProps} from '@shopify/app-bridge-react';
import { Provider } from '@shopify/app-bridge-react';
import type { FC, PropsWithChildren} from 'react';
import { useMemo, useState } from 'react';
import type { To } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * SHOPIFY_APP_TEMPLATE_NODE:
 * A component to configure App Bridge.
 * @desc A thin wrapper around AppBridgeProvider that provides the following capabilities:
 *
 * 1. Ensures that navigating inside the app updates the host URL.
 * 2. Configures the App Bridge Provider, which unlocks functionality provided by the host.
 *
 * See: https://shopify.dev/apps/tools/app-bridge/react-components
 */
export const AppBridgeProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const history = useMemo(
    () => ({replace: (path: To ) => navigate(path, {replace: true})}),
    [navigate],
  );

  const routerConfig: AppBridgeProviderProps['router'] = useMemo(
    () => ({
      location,
      history,
    }),
    [location, history],
  );

  // SHOPIFY_APP_TEMPLATE_NODE:
  // The host may be present initially, but later removed by navigation.
  // By caching this in state, we ensure that the host is never lost.
  // During the lifecycle of an app, these values should never be updated anyway.
  // Using state in this way is preferable to useMemo.
  // See: https://stackoverflow.com/questions/60482318/version-of-usememo-for-caching-a-value-that-will-never-change
  const [{ apiKey, forceRedirect, host }] = useState(() => {
    // const host = new URLSearchParams(location.search).get('host') || (window as any)?.__SHOPIFY_DEV_HOST;
    const host = new URLSearchParams(location.search).get('host');

    // if(!!window) {
    //   (window as any).__SHOPIFY_DEV_HOST = host;
    // }

    return {
      host,
      apiKey: 'bf28e1a0d1bd3a6b501db9043b10df61',
      forceRedirect: true,
    };
  });

  if (!apiKey) {
    return <div>Your app is running without the SHOPIFY_API_KEY environment variable. Please ensure that it is set when running or
    building your React app.</div>
  }

  if (!host) {
    return <h1>
    Your app can only load if the URL has a <b>host</b> argument. Please ensure that it is set, or access your app
    using the Partners Dashboard <b>Test your app</b> feature
  </h1>
  }

  return (
    <Provider config={{ apiKey, forceRedirect, host }} router={routerConfig}>
      {children}
    </Provider>
  );
};
