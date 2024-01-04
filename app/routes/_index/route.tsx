import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect, useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { BlockStack, Box, Button, Card, Form, Grid, Icon, InlineError, InlineStack, Page, Text } from "@shopify/polaris";
import {
  ShareMinor
} from '@shopify/polaris-icons';
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { useEffect } from "react";
import { initialSuccess } from "~/reducers/reducerInitialization";
import { authenticate } from "~/shopify.server";
import { store } from "~/store/configureStore";
import { handleCheckAppEmbedActived } from "~/utils/handleCheckAppEmbedActive";
import indexStyles from "./style.css";


export const links = () => [{ rel: "stylesheet", href: polarisStyles },{ rel: "stylesheet", href: indexStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

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
  if(isActive) {
    const url = new URL(request.url);
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return json({
    shop: responseJson.data.shop,
    theme: themeMain[0],
    isActive,
    apiKey: process.env.SHOPIFY_API_KEY || "",
    SHOPIFY_THEME_APP_EXTENSION_ID: process.env.SHOPIFY_THEME_APP_EXTENSION_ID || ""
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const body = await request.formData();
  const themeId = body.get("id") || '';
  const appEmbedExtensionId = body.get("appEmbedExtensionId") || '';
  const currentTheme = await admin.rest.resources.Asset.all({
    session: session,
    theme_id: themeId as string,
    asset: {"key": "config/settings_data.json"},
  });
  const isActive = handleCheckAppEmbedActived(currentTheme.data[0].value, appEmbedExtensionId as string);
  if(isActive) {
    const url = new URL(request.url);
    throw redirect(`/app?${url.searchParams.toString()}`);
  }
  return { isActive };
};

export default function App() {
  const { apiKey, isActive, theme, shop, SHOPIFY_THEME_APP_EXTENSION_ID } = useLoaderData<typeof loader>();
  const { statusInitialization } = store.getState().initialization;
  const nav = useNavigation();
  const actionData = useActionData<typeof action>()
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const appEmbedExtensionId = SHOPIFY_THEME_APP_EXTENSION_ID;

  const initialData = {
    email: shop.email,
    shopDomain: shop.myshopifyDomain,
    themeId: theme.id,
    appExtensionActived: isActive,
    currencyFormats: shop.currencyFormats,
    currencyCode: shop.currencyCode,
    enabledPresentmentCurrencies: shop.enabledPresentmentCurrencies
  }

  useEffect(() => {
    if(statusInitialization != 'success') {
      store.dispatch(initialSuccess(initialData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusInitialization])

  const handleSubmit = () => submit({ id: initialData.themeId, appEmbedExtensionId: appEmbedExtensionId }, { replace: true, method: "POST" })

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Page>
        <ui-title-bar title="Embed">
        </ui-title-bar>
        <Card>
          <Box padding="500">
            <Grid>
              <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
                <BlockStack gap='500'>
                  <BlockStack gap='200'>
                    <Text as="h2" variant="headingXl">Enable app embed</Text>
                    <Text as="p" variant="bodyLg">App embed is required to display currency. Active it automatically below and click Save on your store.</Text>
                  </BlockStack>
                  <Button size="slim" icon={<Icon
                    source={ShareMinor}
                    tone="base"
                  />} onClick={() => window.open(`https://admin.shopify.com/store/${initialData.shopDomain.replace(".myshopify.com", '')}/themes/${initialData.themeId}/editor?context=apps`, "_blank")}>
                    Active app embed
                  </Button>
                  {!!actionData && !actionData.isActive && !isLoading && <InlineError message="You must active app embed" fieldID="myFieldID" />}
                </BlockStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
                <InlineStack align="center">
                  <img alt="embed" src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Screenshot_2024-01-03_at_11.12.34.png?v=1704255233" />
                </InlineStack>
              </Grid.Cell>
            </Grid>
            <Form method="post" onSubmit={handleSubmit}>
              <Button loading={isLoading} variant="primary" submit>Finish</Button>
            </Form>
          </Box>
        </Card>
      </Page>
    </AppProvider>
  );
}


