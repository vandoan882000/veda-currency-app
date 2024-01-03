import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, redirect, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { useEffect } from "react";
import { useTidioChat } from "~/hooks/useTidioChat";
import { AppBridgeProvider } from "~/providers/AppBridgeProvider";
import { ReduxProvider } from "~/providers/ReduxProvider";
import { authenticate } from "~/shopify.server";
import { handleCheckAppEmbedActived } from "~/utils/handleCheckAppEmbedActive";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin,session } = await authenticate.admin(request);
  const themes = await admin.rest.resources.Theme.all({
    session: session,
  });

  const themeMain = themes.data.filter(item => item.role == "main")

  const currentTheme = await admin.rest.resources.Asset.all({
    session: session,
    theme_id: themeMain[0].id,
    asset: {"key": "config/settings_data.json"},
  });

  const data = await admin.graphql(`
    query {
    shop {
      myshopifyDomain
      email
      currencyCode
      currencyFormats {
        moneyFormat
        moneyWithCurrencyFormat
      }
      enabledPresentmentCurrencies
    }
  }
`
  )
  const responseJson = await data.json();

  const isActive = handleCheckAppEmbedActived(currentTheme.data[0].value, process.env.SHOPIFY_THEME_APP_EXTENSION_ID as string);

  if(!isActive) {
    throw redirect(`/`);
  }
  return json({
    shop: responseJson.data.shop,
    theme: themeMain[0],
    isActive,
    apiKey: process.env.SHOPIFY_API_KEY || "",
    ENV: {
      SHOPIFY_THEME_APP_EXTENSION_ID: process.env.SHOPIFY_THEME_APP_EXTENSION_ID || ""
    }
  });
};

export default function App() {
  const { apiKey, ENV, isActive, theme, shop } = useLoaderData<typeof loader>();
  const { initTidioChat } = useTidioChat();
  const initialData = {
    email: shop.email,
    myshopifyDomain: shop.myshopifyDomain,
    themeId: theme.id,
    appExtensionActived: isActive,
    currencyFormats: shop.currencyFormats,
    currencyCode: shop.currencyCode,
    enabledPresentmentCurrencies: shop.enabledPresentmentCurrencies
  }
  console.log(initialData)
  useEffect(() => {
    initTidioChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <AppProvider isEmbeddedApp apiKey={apiKey}>
        <ui-nav-menu>
          <Link to="/app" rel="home">
            Home
          </Link>
          <Link to="/app/desktop-settings">Desktop Settings</Link>
          <Link to="/app/mobile-settings">Mobile Settings</Link>
          <Link to="/app/faqs">FAQs</Link>
          <Link to="/app/pricing">Pricing</Link>
          <Link to="/app/partners">Partners</Link>
        </ui-nav-menu>
        <AppBridgeProvider>
          <ReduxProvider>
            <Outlet />
          </ReduxProvider>
        </AppBridgeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
      </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
