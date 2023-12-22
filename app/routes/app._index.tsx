import { useCallback, useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  Link,
  InlineStack,
  Checkbox,
  ColorPicker,
  ChoiceList,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { MultiAutocompleteSelect } from "~/components/Select/Select";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

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
  const nav = useNavigation();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const productId = actionData?.product?.id.replace(
    "gid://shopify/Product/",
    ""
  );
  const [checked, setChecked] = useState(false);
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });
  const [selected, setSelected] = useState<string[]>(['hidden']);

  const handleChangeSize = useCallback((value: string[]) => setSelected(value), []);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );


  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId]);
  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <ui-title-bar title="Settings">
        <button variant="primary" onClick={generateProduct}>
          Save
        </button>
      </ui-title-bar>
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="500">
            <Card background="bg-fill-active" >
              <BlockStack gap="200">
                <Checkbox
                  label="Main menu"
                  checked={checked}
                  onChange={handleChange}
                />
                <Text variant="headingMd" as="span">
                  Integrate the Currency Converter to the Main Menu. If the currency does not show up on Main Menu{" "}
                  <Link url="https://doc-currency-converter.myshopkit.app/">click here to learn how to resolve it</Link>
                </Text>
              </BlockStack>
            </Card>
            <Card background="bg-fill-active">
              <BlockStack gap="200">
                <Checkbox
                  label="One more placement"
                  checked={checked}
                  onChange={handleChange}
                />
                <Text variant="headingMd" as="span">
                  Add one more placement that you want to display the Currency Converter
                </Text>
              </BlockStack>
            </Card>
            <Layout>
              <Layout.Section variant="oneHalf">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Text Color
                  </Text>
                  <ColorPicker onChange={setColor} color={color}></ColorPicker>
                </BlockStack>
              </Layout.Section>
              <Layout.Section variant="oneHalf">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Background Color
                  </Text>
                  <ColorPicker onChange={setColor} color={color}></ColorPicker>
                </BlockStack>
              </Layout.Section>
            </Layout>
            <Text as="h2" variant="headingMd">
              Auto Detect Currency
            </Text>
            <InlineStack gap="0">
              <Button variant="primary" url="/">Unlock It</Button>
            </InlineStack>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Size
              </Text>
              <ChoiceList
                title="a"
                choices={[
                  {label: 'Small', value: 'small'},
                  {label: 'Medium', value: 'medium'},
                  {label: 'Large', value: 'large'},
                ]}
                selected={selected}
                onChange={handleChangeSize}
              />
            </BlockStack>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Select Currencies
              </Text>
              <MultiAutocompleteSelect />
            </BlockStack>
            <InlineStack gap="300">
              <Button loading={isLoading} onClick={generateProduct}>
                Generate a product
              </Button>
              {actionData?.product && (
                <Button
                  url={`shopify:admin/products/${productId}`}
                  target="_blank"
                  variant="plain"
                >
                  View product
                </Button>
              )}
            </InlineStack>
            {actionData?.product && (
              <Box
                padding="400"
                background="bg-surface-active"
                borderWidth="025"
                borderRadius="200"
                borderColor="border"
                overflowX="scroll"
              >
                <pre style={{ margin: 0 }}>
                  <code>{JSON.stringify(actionData.product, null, 2)}</code>
                </pre>
              </Box>
            )}
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
