import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  InlineStack,
  Layout,
  Link,
  Page,
  RadioButton,
  Select,
  Text,
  TextField
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { CustomColorPicker } from "~/components/CustomColorPicker/CustomColorPicker";
import { MultiAutocompleteSelect } from "~/components/MultiAutocompleteSelect/MultiAutocompleteSelect";
import { authenticate } from "~/shopify.server";

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
  const HTML = '<div class="select-currency"></div>';
  const [inMainMenu, setInMainMenu] = useState(false);
  const [isMorePlacement, setMorePlacement] = useState(false);
  const [placement, setPlacement] = useState('Fixed Top Left');
  const [size, setSize] = useState('small');
  const [currencyType, setCurrencyType] = useState('select');
  const [isRoundSetting, setRoundSetting] = useState(false);
  const [textColor, setTextColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const [backgroundColor, setBackgroundColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const handleChangeRoundSetting = useCallback(
    (newChecked: boolean) => setRoundSetting(newChecked),
    [],
  );

  const handleChangeSize = useCallback(
    (_: boolean, newValue: string) => setSize(newValue),
    [],
  );

  const handleChangeCurrencyType = useCallback(
    (_: boolean, newValue: string) => setCurrencyType(newValue),
    [],
  );


  const handleChangeMainMenu = useCallback(
    (newChecked: boolean) => setInMainMenu(newChecked),
    [],
  );

  const handleChangeMorePlacement = useCallback(
    (newChecked: boolean) => setMorePlacement(newChecked),
    [],
  );


  const handleSelectChangePlacement = useCallback(
    (value: string) => setPlacement(value),
    [],
  );

  // const renderChildren = useCallback(
  //   () => (
  //     <img src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674" alt=""></img>
  //   ),
  //   [],
  // );


  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId]);
  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <ui-title-bar title="Desktop Settings">
        <button variant="primary" onClick={generateProduct}>
          Save
        </button>
      </ui-title-bar>
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingLg">Currency Converter Placement</Text>
          <Text as="p" variant="bodyMd">Setup placements where you want Currency Converter show on</Text>
        </BlockStack>
        <Card>
          <BlockStack gap="200">
            <InlineStack align="space-between">
              <div style={{ display: "flex", columnGap: 10, height: 'fit-content' }}>
                <Text as="h3" variant="headingMd">Main menu</Text>
                {inMainMenu ? <Badge size="small" tone="success">On</Badge> : <Badge size="small">Off</Badge>}
              </div>
              <Button onClick={() => handleChangeMainMenu(!inMainMenu)}>{inMainMenu ? 'Turn off' : 'Turn on'}</Button>
            </InlineStack>
            <Text as="span" variant="bodyMd">
              Integrate the Currency Converter to the Main Menu. If the currency does not show up on Main Menu{" "}
              <Link url="https://doc-currency-converter.myshopkit.app/">click here to learn how to resolve it</Link>
            </Text>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap="200">
            <InlineStack align="space-between">
              <div style={{ display: "flex", columnGap: 10, height: 'fit-content' }}>
                <Text as="h3" variant="headingMd">One more placement</Text>
                {isMorePlacement ? <Badge size="small" tone="success">On</Badge> : <Badge size="small">Off</Badge>}
              </div>
              <Button onClick={() => handleChangeMorePlacement(!isMorePlacement)}>{isMorePlacement ? 'Turn off' : 'Turn on'}</Button>
            </InlineStack>
            <Text as="span" variant="bodyMd">
              Add one more placement that you want to display the Currency Converter
            </Text>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap='400'>
            <Text as="h2" variant="headingMd">General</Text>
            <BlockStack gap='200'>
              <Select
                label="Placement"
                options={['Fixed Top Left', 'Top Left', 'Fixed Top Right', 'Fixed Bottom Left', 'Bottom Left', 'Fixed Bottom Right', 'Bottom Right']}
                value={placement}
                onChange={handleSelectChangePlacement}
              />
            </BlockStack>
            <Layout>
              <Layout.Section variant="oneHalf">
                <TextField
                  label="Left"
                  type="number"
                  value='10'
                  onChange={() => {}}
                  autoComplete="off"
                />
              </Layout.Section>
              <Layout.Section variant="oneHalf">
                <TextField
                  label="Bottom"
                  type="number"
                  value='100'
                  onChange={() => {}}
                  autoComplete="off"
                />
              </Layout.Section>
            </Layout>
            <Layout>
              <Layout.Section variant="oneHalf">
                <BlockStack gap="200">
                  <Text as="h2" variant="bodyMd">
                    Text Color
                  </Text>
                  <CustomColorPicker {...textColor} onChange={setTextColor}></CustomColorPicker>
                </BlockStack>
              </Layout.Section>
              <Layout.Section variant="oneHalf">
                <BlockStack gap="200">
                  <Text as="h2" variant="bodyMd">
                    Background Color
                  </Text>
                  <CustomColorPicker {...backgroundColor} onChange={setBackgroundColor}></CustomColorPicker>
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
              <Text as="h2" variant="bodyMd">
                Size
              </Text>
              <Layout>
                <Layout.Section variant="oneThird">
                  <RadioButton
                    label="Small"
                    checked={size === 'small'}
                    id="small"
                    name="size"
                    onChange={handleChangeSize}
                  />
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <RadioButton
                    label="Medium"
                    checked={size === 'medium'}
                    id="medium"
                    name="size"
                    onChange={handleChangeSize}
                  />
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <RadioButton
                    label="Large"
                    checked={size === 'large'}
                    id="large"
                    name="size"
                    onChange={handleChangeSize}
                  />
                </Layout.Section>
              </Layout>
            </BlockStack>
            <BlockStack gap="200">
              <Text as="h2" variant="bodyMd">
                Select Currencies
              </Text>
              <Layout>
                <Layout.Section variant="oneHalf">
                  <RadioButton
                    label="All Currencies"
                    checked={currencyType === 'all'}
                    id="all"
                    name="currencyType"
                    onChange={handleChangeCurrencyType}
                  />
                </Layout.Section>
                <Layout.Section variant="oneHalf">
                  <RadioButton
                    label="Select Currencies"
                    checked={currencyType === 'select'}
                    id="select"
                    name="currencyType"
                    onChange={handleChangeCurrencyType}
                  />
                </Layout.Section>
              </Layout>
              { currencyType === 'select' && <MultiAutocompleteSelect /> }
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
        <Card>
          <BlockStack gap='400'>
            <Text as="h2" variant="headingMd">Advanced</Text>
            <BlockStack gap="200">
              <Text variant="bodyMd" as="h2">
                Round Setting
              </Text>
              <Checkbox
                label="Round Setting"
                checked={isRoundSetting}
                onChange={handleChangeRoundSetting}
              />
            </BlockStack>
            <BlockStack gap="200">
              <Text variant="bodyMd" as="h2">
                Currency Code
              </Text>
              <BlockStack gap="300">
                <Text variant="bodySm" as="span">
                  Copy the following code and paste to place that you want display the Multi Currency Converter Toolbar manually
                </Text>
                <TextField labelHidden={true} label="a" value={HTML} autoComplete="off" disabled></TextField>
                <Button fullWidth={false} variant="primary">Copy Code</Button>
              </BlockStack>
            </BlockStack>
            <BlockStack gap="200">
              <Text variant="bodyMd" as="h2">
                Custom Css
              </Text>
              <TextField
                label="Custom Css"
                labelHidden
                value=''
                multiline={5}
                autoComplete="off"
              />
            </BlockStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
