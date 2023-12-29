import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { ReduxProvider } from "~/providers/ReduxProvider";
import { authenticate } from "~/shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

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
          <Link to="/app/advanced">Request features to us</Link>
        </ui-nav-menu>
        <ReduxProvider>
          <Outlet />
        </ReduxProvider>
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
