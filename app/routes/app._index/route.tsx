import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import {
  BlockStack,
  Button,
  Card,
  Grid,
  InlineStack,
  Link,
  MediaCard,
  Page,
  Text
} from "@shopify/polaris";
import { authenticate } from "../../shopify.server";
import { Table } from "~/components/Table/Table";
import indexStyles from "./style.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }],
        },
      },
    }
  );
  const responseJson = await response.json();

  return json({
    product: responseJson.data.productCreate.product,
  });
};

export default function Index() {

  return (
    <Page>
      <ui-title-bar title="Home">
      </ui-title-bar>
      <BlockStack gap="500">
        <BlockStack>
          <Text as="h2" variant="headingLg">Hi</Text>
          <Text as="span" variant="bodyLg">Welcome to Currency Converter</Text>
        </BlockStack>
        <MediaCard
          title="About App"
          description="The first and foremost step towards expanding your business globally is making it user-friendly for global customers. Customers from different corners of the world want to see the displayed price in their domestic currency. This helps save them from the hassle of converting currency mentally, especially those who don’t have a head for figures. Thus, customers will feel more comfortable browsing your products and more likely to make a purchase."
          primaryAction={{
            content: 'Learn more',
            onAction: () => redirect('https://help.myshopkit.app/en/docs/multi-currency-converter/'),
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
        <Card>
          <BlockStack gap="400">
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">App Recommendations</Text>
              <Text as="span" variant="bodyMd">We're proud to help you grow your online store with these powerful apps. We provide everything to save your time and grow your bussiness effectively</Text>
            </BlockStack>
            <Grid
              columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            >
              <Grid.Cell>
                <Card>
                  <img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Myshopkit_1200x400_423333de-8800-4557-b1bd-5bc63cfe2569.jpg?v=1699589254" alt="" />
                  <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">
                    <Text as="h3" variant="headingMd">Lai Product Reviews</Text>
                  </Link>
                  <InlineStack blockAlign="center" align="space-between">
                    <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">More info</Link>
                    <Button>Get App</Button>
                  </InlineStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell>
                <Card>
                  <img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Myshopkit_1200x400_423333de-8800-4557-b1bd-5bc63cfe2569.jpg?v=1699589254" alt="" />
                  <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">
                    <Text as="h3" variant="headingMd">Lai Product Reviews</Text>
                  </Link>
                  <InlineStack blockAlign="center" align="space-between">
                    <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">More info</Link>
                    <Button>Get App</Button>
                  </InlineStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell>
                <Card>
                  <img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Myshopkit_1200x400_423333de-8800-4557-b1bd-5bc63cfe2569.jpg?v=1699589254" alt="" />
                  <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">
                    <Text as="h3" variant="headingMd">Lai Product Reviews</Text>
                  </Link>
                  <InlineStack blockAlign="center" align="space-between">
                    <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">More info</Link>
                    <Button>Get App</Button>
                  </InlineStack>
                </Card>
              </Grid.Cell>
            </Grid>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
