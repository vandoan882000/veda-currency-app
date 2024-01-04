import type { LoaderFunctionArgs } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
// import type {
//   HSBAColor} from "@shopify/polaris";
import {
  Badge,
  BlockStack,
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
import { useCallback, useState } from "react";
// import { CustomColorPicker } from "~/components/CustomColorPicker/CustomColorPicker";
import { MultiAutocompleteSelect } from "~/components/MultiAutocompleteSelect/MultiAutocompleteSelect";
import { defaultSetting } from "~/reducers/reducerSettings";
import { authenticate } from "~/shopify.server";
import type { CurrencySettings } from "~/type";
// import { hexToHsl } from "~/utils/hexToHsl";
// import { hslToHex } from "~/utils/hslToHex";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  const submit = useSubmit();
  const HTML = '<div class="select-currency"></div>';
  const [formData, setFormData] = useState(defaultSetting)

  const handleChangeRoundSetting = useCallback(
    (newChecked: boolean) => setFormData({ ...formData, autoDetectCurrency: newChecked }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChangeSize = useCallback(
    (_: boolean, newValue: CurrencySettings['size']) => setFormData({ ...formData, size: newValue }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChangeCurrencyType = useCallback(
    (_: boolean, newValue: string) => setFormData({ ...formData, allCurrency: newValue == 'all' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );


  const handleChangeMainMenu = useCallback(
    (newChecked: boolean) => {
      const newData = formData.location.filter(item => item != 'header')
      setFormData({ ...formData, location: newChecked ? [...newData, 'header'] : newData })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChangeMorePlacement = useCallback(
    (newChecked: boolean) => {
      const newData = formData.location.filter(item => item != 'other')
      setFormData({ ...formData, location: newChecked ? [...newData, 'other'] : newData })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );


  const handleSelectChangePlacement = useCallback(
    (value: 'top_left'
    | 'top_right'
    | 'bottom_left'
    | 'bottom_right'
    | 'top_left_bar'
    | 'top_right_bar'
    | 'bottom_left_bar'
    | 'bottom_right_bar') => setFormData({ ...formData, placement: value }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );


  // const renderChildren = useCallback(
  //   () => (
  //     <img src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674" alt=""></img>
  //   ),
  //   [],
  // );

  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  console.log(formData);
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
                {formData.location.includes("header") ? <Badge size="small" tone="success">On</Badge> : <Badge size="small">Off</Badge>}
              </div>
              <Button onClick={() => handleChangeMainMenu(!formData.location.includes("header"))}>{formData.location.includes("header") ? 'Turn off' : 'Turn on'}</Button>
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
                {formData.location.includes("other") ? <Badge size="small" tone="success">On</Badge> : <Badge size="small">Off</Badge>}
              </div>
              <Button onClick={() => handleChangeMorePlacement(!formData.location.includes("other"))}>{formData.location.includes("other") ? 'Turn off' : 'Turn on'}</Button>
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
                options={[
                  {label: 'Top Left', value: 'top_left'},
                  {label: 'Top Right', value: 'top_right'},
                  {label: 'Bottom Left', value: 'bottom_left'},
                  {label: 'Bottom Right', value: 'bottom_right'},
                  {label: 'Fixed Top Left', value: 'top_left_bar'},
                  {label: 'Fixed Top Right', value: 'top_right_bar'},
                  {label: 'Fixed Bottom Left', value: 'bottom_left_bar'},
                  {label: 'Fixed Bottom Right', value: 'bottom_right_bar'},
                ]}
                value={formData.placement}
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
                  {/* <CustomColorPicker {...hexToHsl(formData.color)} onChange={(value: HSBAColor) =>  setFormData({ ...formData, color: hslToHex(value.hue, value.saturation, value.brightness) })}></CustomColorPicker> */}
                </BlockStack>
              </Layout.Section>
              <Layout.Section variant="oneHalf">
                <BlockStack gap="200">
                  <Text as="h2" variant="bodyMd">
                    Background Color
                  </Text>
                  {/* <CustomColorPicker {...hexToHsl(formData.backgroundColor)} onChange={(value: HSBAColor) =>  setFormData({ ...formData, backgroundColor: hslToHex(value.hue, value.saturation, value.brightness) })}></CustomColorPicker> */}
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
                    checked={formData.size === 'sm'}
                    id="small"
                    name="size"
                    onChange={handleChangeSize}
                  />
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <RadioButton
                    label="Medium"
                    checked={formData.size === 'md'}
                    id="medium"
                    name="size"
                    onChange={handleChangeSize}
                  />
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <RadioButton
                    label="Large"
                    checked={formData.size === 'lg'}
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
                    checked={formData.allCurrency}
                    id="all"
                    name="currencyType"
                    onChange={handleChangeCurrencyType}
                  />
                </Layout.Section>
                <Layout.Section variant="oneHalf">
                  <RadioButton
                    label="Select Currencies"
                    checked={!formData.allCurrency}
                    id="select"
                    name="currencyType"
                    onChange={handleChangeCurrencyType}
                  />
                </Layout.Section>
              </Layout>
              { !formData.allCurrency && <MultiAutocompleteSelect /> }
            </BlockStack>

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
                checked={formData.autoDetectCurrency}
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
                value={formData.css}
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
