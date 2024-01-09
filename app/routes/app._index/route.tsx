import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Card,
  MediaCard,
  Page,
  Text
} from "@shopify/polaris";
import { Table } from "~/components/Table/Table";
import { authenticate } from "../../shopify.server";
import indexStyles from "./style.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const data = await admin.graphql(`
      query {
        shop {
          name
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
    `);
  const responseJson = await data.json();
  return json({
    shop: responseJson.data.shop
  });
};

export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();
  return (
    <Page>
      <ui-title-bar title="Dashboard">
      </ui-title-bar>
      <Box paddingBlockEnd='500'>
        <BlockStack gap="500">
          <BlockStack gap='200'>
            <Text as="h2" variant="headingLg">Hi, {shop.name}</Text>
            <Text as="span" variant="bodyLg">Welcome to Currency Converter</Text>
          </BlockStack>
          <MediaCard
            title="About App"
            description="The first and foremost step towards expanding your business globally is making it user-friendly for global customers. Customers from different corners of the world want to see the displayed price in their domestic currency. This helps save them from the hassle of converting currency mentally, especially those who don’t have a head for figures. Thus, customers will feel more comfortable browsing your products and more likely to make a purchase."
            primaryAction={{
              content: 'Learn more',
              onAction: () => window.open('https://help.myshopkit.app/en/docs/multi-currency-converter/ ', "_blank"),
            }}
          >
            <img
              alt="Pricing"
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src="https://cdn.shopify.com/app-store/listing_images/0534563571f4c9422064855cb4998289/promotional_image/CO26zNLzmf4CEAE=.png?width=600"
            />
          </MediaCard>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Settings</Text>
              <Table></Table>
            </BlockStack>
          </Card>
          <MediaCard
            title="Banner"
            description="The first and foremost step towards expanding your business globally is making it user-friendly for global customers. Customers from different corners of the world want to see the displayed price in their domestic currency."
            primaryAction={{
              content: 'Explore now',
              onAction: () => window.open('https://help.myshopkit.app/en/docs/multi-currency-converter/ ', "_blank"),
            }}
          >
            <img
              alt="Pricing"
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Myshopkit_1200x400_423333de-8800-4557-b1bd-5bc63cfe2569.jpg?v=1699589254"
            />
          </MediaCard>
        </BlockStack>
      </Box>
    </Page>
  );
}
