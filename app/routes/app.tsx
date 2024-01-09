import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { authenticate } from "~/shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({
    apiKey: process.env.SHOPIFY_API_KEY || "",
  });

};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const { apiKey } = data;
  // const { initTidioChat } = useTidioChat();

  // useEffect(() => {
  //   initTidioChat();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Lỗi https://github.com/Shopify/shopify-app-template-remix/issues/369
  // SOLUTION: https://shopify.dev/docs/api/app-bridge-library/reference/navigation-menu
  return (
      <AppProvider isEmbeddedApp apiKey={apiKey}>
        <ui-nav-menu>
          {/* <Link to="/app" rel="home">
            Home
          </Link>
          <Link to="/app/desktop-settings">Desktop Settings</Link>
          <Link to="/app/mobile-settings">Mobile Settings</Link>
          <Link to="/app/faqs">FAQs</Link>
          <Link to="/app/pricing">Pricing</Link>
          <Link to="/app/partners">Partners</Link> */}
          <a href="/" rel="home">Home</a>
          <a href="/app/desktop-settings">Desktop Settings</a>
          <a href="/app/mobile-settings">Mobile Settings</a>
          <a href="/app/faqs">FAQs</a>
          <a href="/app/pricing">Pricing</a>
          <a href="/app/partners">Partners</a>
        </ui-nav-menu>
        <Outlet />
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
