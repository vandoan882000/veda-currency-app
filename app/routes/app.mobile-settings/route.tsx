import type { LoaderFunctionArgs } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import type {
  HSBAColor
} from "@shopify/polaris";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  Icon,
  InlineStack,
  Layout,
  Link,
  Page,
  RadioButton,
  Select,
  Text,
  TextField,
  Tooltip
} from "@shopify/polaris";
import {
  CircleInformationMajor
} from '@shopify/polaris-icons';
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { CustomColorPicker } from "~/components/CustomColorPicker/CustomColorPicker";
import { MultiAutocompleteSelect } from "~/components/MultiAutocompleteSelect/MultiAutocompleteSelect";
import { authenticate } from "~/shopify.server";
import { settingSelector } from "~/store/selectors";
import type { CurrencyKey, CurrencySettings } from "~/type";
import { hexToHsl } from "~/utils/hexToHsl";
import { hslToHex } from "~/utils/hslToHex";
import indexStyles from "./style.css";


export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const submit = useSubmit();
  const HTML = '<div class="select-currency"></div>';
  const { settings } = useSelector(settingSelector);
  const [formData, setFormData] = useState(settings.desktop);
  console.log(formData, settings)

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
      setFormData(prev => ({ ...prev, location: newChecked ? prev.location.filter(item => item != 'header') : [...prev.location, 'header'] }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChangeMorePlacement = useCallback(
    (newChecked: boolean) => {
      setFormData(prev => ({ ...prev, location: newChecked ? prev.location.filter(item => item != 'other') : [...prev.location, 'other'] }));
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

  const generateProduct = () => submit({}, { replace: true, method: "POST" });
  return (
    <Page>
      <ui-title-bar title="Desktop Settings">
        <button variant="primary" onClick={generateProduct}>
          Save
        </button>
      </ui-title-bar>
      <Box paddingBlockEnd='500'>
        <BlockStack gap="500">
          <Card>
            <BlockStack gap='500'>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">Currency Converter Placement</Text>
                <Text as="p" variant="bodyMd">Setup placements where you want Currency Converter show on</Text>
              </BlockStack>
              <BlockStack gap="100">
                <InlineStack align="space-between">
                  <div style={{ display: "flex", columnGap: 10, height: 'fit-content' }}>
                    <Text as="p" variant="bodyMd">Main menu</Text>
                    {formData.location.includes("header") ? <Badge size="small" tone="success">On</Badge> : <Badge size="small">Off</Badge>}
                  </div>
                  <Button onClick={() => handleChangeMainMenu(formData.location.includes("header"))}>{formData.location.includes("header") ? 'Turn off' : 'Turn on'}</Button>
                </InlineStack>
                <Text as="span" variant="bodyMd" tone="subdued">
                  Integrate the Currency Converter to the Main Menu. If the currency does not show up on Main Menu{" "}
                  <Link url="https://doc-currency-converter.myshopkit.app/">click here to learn how to resolve it</Link>
                </Text>
              </BlockStack>
              <BlockStack gap="100">
                <InlineStack align="space-between">
                  <div style={{ display: "flex", columnGap: 10, height: 'fit-content' }}>
                    <Text as="p" variant="bodyMd">One more placement</Text>
                    {formData.location.includes("other") ? <Badge size="small" tone="success">On</Badge> : <Badge size="small">Off</Badge>}
                  </div>
                  <Button onClick={() => handleChangeMorePlacement(formData.location.includes("other"))}>{formData.location.includes("other") ? 'Turn off' : 'Turn on'}</Button>
                </InlineStack>
                <Text as="span" variant="bodyMd" tone="subdued">
                  Add one more placement that you want to display the Currency Converter
                </Text>
              </BlockStack>
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
                {(formData.placement == 'top_left' || formData.placement == 'top_left_bar' || formData.placement == 'top_right' || formData.placement == 'top_right_bar') && <Layout.Section variant="oneHalf">
                  <TextField
                    label="Top"
                    type="number"
                    value={`${formData.top}`}
                    onChange={(newValue: string) => setFormData({...formData, top: Number(newValue)})}
                    autoComplete="off"
                  />
                </Layout.Section>}
                {(formData.placement == 'bottom_left' || formData.placement == 'bottom_right' || formData.placement == 'bottom_left_bar' || formData.placement == 'bottom_right_bar') && <Layout.Section variant="oneHalf">
                  <TextField
                    label="Bottom"
                    type="number"
                    value={`${formData.bottom}`}
                    onChange={(newValue: string) => setFormData({...formData, bottom: Number(newValue)})}
                    autoComplete="off"
                  />
                </Layout.Section>}
                {(formData.placement == 'top_left' || formData.placement == 'bottom_left' || formData.placement == 'top_left_bar' || formData.placement == 'bottom_left_bar') && <Layout.Section variant="oneHalf">
                  <TextField
                    label="Left"
                    type="number"
                    value={`${formData.left}`}
                    onChange={(newValue: string) => setFormData({...formData, left: Number(newValue)})}
                    autoComplete="off"
                  />
                </Layout.Section>}
                {(formData.placement == 'bottom_right' || formData.placement == 'bottom_right_bar' || formData.placement == 'top_right' || formData.placement == 'top_right_bar') && <Layout.Section variant="oneHalf">
                  <TextField
                    label="Right"
                    type="number"
                    value={`${formData.right}`}
                    onChange={(newValue: string) => setFormData({...formData, right: Number(newValue)})}
                    autoComplete="off"
                  />
                </Layout.Section>}
              </Layout>
              <Layout>
                <Layout.Section variant="oneHalf">
                  <BlockStack gap="200">
                    <Text as="h2" variant="bodyMd">
                      Text Color
                    </Text>
                    <CustomColorPicker {...hexToHsl(formData.color)} onChange={(value: HSBAColor) =>  setFormData(prev => ({ ...prev, color: hslToHex(value.hue, value.saturation * 100, value.brightness * 100) }))}></CustomColorPicker>
                  </BlockStack>
                </Layout.Section>
                <Layout.Section variant="oneHalf">
                  <BlockStack gap="200">
                    <Text as="h2" variant="bodyMd">
                      Background Color
                    </Text>
                    <CustomColorPicker {...hexToHsl(formData.backgroundColor)} onChange={(value: HSBAColor) =>  setFormData(prev => ({ ...prev, backgroundColor: hslToHex(value.hue, value.saturation * 100, value.brightness * 100) }))}></CustomColorPicker>
                  </BlockStack>
                </Layout.Section>
              </Layout>
              <BlockStack gap="200">
                <Text as="h2" variant="bodyMd">
                  Style
                </Text>
                <Layout>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Style 1"
                      checked={formData.variant === 'style1'}
                      id="style1"
                      name="style"
                      onChange={(_: boolean, newValue: CurrencySettings['variant']) => setFormData({ ...formData, variant: newValue })}
                    />
                  </Layout.Section>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Style 2"
                      checked={formData.variant === 'style2'}
                      id="style2"
                      name="style"
                      onChange={(_: boolean, newValue: CurrencySettings['variant']) => setFormData({ ...formData, variant: newValue })}
                    />
                  </Layout.Section>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Style 3"
                      checked={formData.variant === 'style3'}
                      id="style3"
                      name="style"
                      onChange={(_: boolean, newValue: CurrencySettings['variant']) => setFormData({ ...formData, variant: newValue })}
                    />
                  </Layout.Section>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Style 4"
                      checked={formData.variant === 'style4'}
                      id="style4"
                      name="style"
                      onChange={(_: boolean, newValue: CurrencySettings['variant']) => setFormData({ ...formData, variant: newValue })}
                    />
                  </Layout.Section>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Style 5"
                      checked={formData.variant === 'style5'}
                      id="style5"
                      name="style"
                      onChange={(_: boolean, newValue: CurrencySettings['variant']) => setFormData({ ...formData, variant: newValue })}
                    />
                  </Layout.Section>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Style 6"
                      checked={formData.variant === 'style6'}
                      id="style6"
                      name="style"
                      onChange={(_: boolean, newValue: CurrencySettings['variant']) => setFormData({ ...formData, variant: newValue })}
                    />
                  </Layout.Section>
                </Layout>
              </BlockStack>
              <BlockStack gap="200">
                <Text as="h2" variant="bodyMd">
                  Size
                </Text>
                <Layout>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Small"
                      checked={formData.size === 'sm'}
                      id="sm"
                      name="size"
                      onChange={handleChangeSize}
                    />
                  </Layout.Section>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Medium"
                      checked={formData.size === 'md'}
                      id="md"
                      name="size"
                      onChange={handleChangeSize}
                    />
                  </Layout.Section>
                  <Layout.Section variant="oneThird">
                    <RadioButton
                      label="Large"
                      checked={formData.size === 'lg'}
                      id="lg"
                      name="size"
                      onChange={handleChangeSize}
                    />
                  </Layout.Section>
                </Layout>
              </BlockStack>
              <BlockStack gap="200">
                <InlineStack gap='100'>
                  <Text variant="bodyMd" as="h2">
                    Auto Detect Currency
                  </Text>
                  <Tooltip content={`Visitor's currency is added automatically`}>
                    <Icon
                      source={CircleInformationMajor}
                      tone="base"
                    />
                  </Tooltip>
                </InlineStack>
                <Checkbox
                  label="Auto Detect Currency"
                  checked={formData.autoDetectCurrency}
                  onChange={(newChecked: boolean) => setFormData({ ...formData, autoDetectCurrency: newChecked })}
                />
              </BlockStack>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">Select Currencies</Text>
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
              { !formData.allCurrency && <MultiAutocompleteSelect selectedOptions={formData.currencies} onChange={(value: string[]) => {setFormData(prev => ({ ...prev, currencies: value as CurrencyKey[] }))}} /> }
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap='500'>
              <Text as="h2" variant="headingMd">Checkout notifcation</Text>
              <BlockStack gap='200'>
                <BlockStack gap="100">
                  <InlineStack align="space-between">
                    <div style={{ display: "flex", columnGap: 10, height: 'fit-content' }}>
                      <Text as="p" variant="bodyMd">Enable checkout notification</Text>
                      {formData.notification.enable ? <Badge size="small" tone="success">On</Badge> : <Badge size="small">Off</Badge>}
                    </div>
                    <Button onClick={() => {setFormData(prev => ({ ...prev, notification: { ...prev.notification, enable: !prev.notification.enable }}))}}>{formData.notification.enable ? 'Turn off' : 'Turn on'}</Button>
                  </InlineStack>
                  <Text as="span" variant="bodySm" tone="subdued">
                    This notification will appear on the cart page. It is meant to inform your customers that Shopify only allows them to Checkout in your shop's main currency.{" "}
                    <Link url="https://help.myshopkit.app/en/docs/multi-currency-converter/setting-up-checkout-notification-7477/">Click here to learn how to setup this feature</Link>
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <InlineStack gap='100'>
                    <Text variant="bodyMd" as="h2">
                      Message
                    </Text>
                    <Tooltip content={`"{myshopkit.currentCurrency}": This value will be replaced with the currency unit that the customer has selected.`}>
                      <Icon
                        source={CircleInformationMajor}
                        tone="base"
                      />
                    </Tooltip>
                  </InlineStack>
                  <TextField
                    label="Message"
                    labelHidden
                    value={formData.notification.message}
                    onChange={(newValue: string) => {setFormData(prev => ({ ...prev, notification: { ...prev.notification, message: newValue }}))}}
                    multiline={4}
                    autoComplete="off"
                  />
                </BlockStack>
                <Layout>
                <Layout.Section variant="oneHalf">
                  <BlockStack gap="200">
                    <Text as="h2" variant="bodyMd">
                      Message Color
                    </Text>
                    <CustomColorPicker {...hexToHsl(formData.notification.color)} onChange={(value: HSBAColor) =>  setFormData(prev => ({ ...prev, notification: { ...prev.notification, color: hslToHex(value.hue, value.saturation * 100, value.brightness * 100) } }))}></CustomColorPicker>
                  </BlockStack>
                </Layout.Section>
                <Layout.Section variant="oneHalf">
                  <BlockStack gap="200">
                    <Text as="h2" variant="bodyMd">
                      Message Background Color
                    </Text>
                    <CustomColorPicker {...hexToHsl(formData.notification.backgroundColor)} onChange={(value: HSBAColor) =>  setFormData(prev => ({ ...prev, notification: { ...prev.notification, backgroundColor: hslToHex(value.hue, value.saturation * 100, value.brightness * 100) } }))}></CustomColorPicker>
                  </BlockStack>
                </Layout.Section>
              </Layout>
              </BlockStack>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap='500'>
              <Text as="h2" variant="headingMd">Advanced</Text>
              <BlockStack gap="200">
                <Text variant="bodyMd" as="h2">
                  Round Setting
                </Text>
                <Checkbox
                  label="Round Setting"
                  checked={formData.roundSettingsEnabled}
                  onChange={(newChecked: boolean) => setFormData({ ...formData, roundSettingsEnabled: newChecked })}
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
      </Box>
    </Page>
  );
}
