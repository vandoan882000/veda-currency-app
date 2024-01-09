import { defer, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
  ContextualSaveBar,
  Frame,
  Grid,
  Icon,
  InlineStack,
  Layout,
  Link,
  Page,
  RadioButton,
  Select,
  Text,
  TextField,
  Thumbnail,
  Tooltip
} from "@shopify/polaris";
import {
  CircleInformationMajor
} from '@shopify/polaris-icons';
import axios from "axios";
import { useCallback, useState } from "react";
import { CustomColorPicker } from "~/components/CustomColorPicker/CustomColorPicker";
import { MultiAutocompleteSelect } from "~/components/MultiAutocompleteSelect/MultiAutocompleteSelect";
import { authenticate } from "~/shopify.server";
import type { CurrencyKey, CurrencySettings, Settings } from "~/type";
import { fetchAPI } from "~/utils/fetchAPI";
import { hexToHsl } from "~/utils/hexToHsl";
import { hslToHex } from "~/utils/hslToHex";
import { toPMSettings } from "~/utils/toPMSettings";
import { toSettings } from "~/utils/toSettings";
import indexStyles from "./style.css";


export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const signup = await axios.post('https://v2-multi-currency-converter.myshopkit.app/api/v1/auth/signup-with-shopify', {
      "shopDomain": session.shop,
      "accessToken": session.accessToken
    }, {
      headers: {
        'X-JWT-TYPE': 'SHOPIFY'
      }
    });
  const setting = await fetchAPI.request({
    url: `api/v1/me/info`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${signup.data.data.token}`
    }
  })
  return defer({
    settings: setting.data.data.currencySettings,
    token: signup.data.data.token
  });
};

// export const action = async ({ request }: ActionFunctionArgs) => {
//   await authenticate.admin(request);
//   const body = await request.formData();
//   const value = Object.fromEntries(body);
//   // const response = await fetchAPI.request({
//   //   url: `api/v1/me/currencies/desktop`,
//   //   method: 'put',
//   //   headers: {
//   //     Authorization: `Bearer ${value.token}`
//   //   },
//   //   data: {
//   //     "desktop": toPMSettingDesktop(value as unknown as Setting)
//   //   }
//   // });
//   // console.log(response.data.data);
//   // console.log(value, 'doan');

//  return json({ setting1: toPMSettingDesktop(value as unknown as Setting) });
// };

export default function Index() {
  const updateSettings = async (setting: Settings, token: string) => {
    await fetchAPI.request({
      method: 'put',
      url: `api/v1/me/currencies/desktop`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        "desktop": toPMSettings(setting).desktop
      }
    });
    setChange(false);
  }

  const data = useLoaderData<typeof loader>();
  const HTML = '<div class="select-currency"></div>';
  const settings = toSettings(data.settings) as Settings;
  const token = data.token;
  const [formData, setFormData] = useState(settings.desktop);
  const [isChange, setChange] = useState(true);

  // useEffect(() => {
  //   if(!objCompare(settings.desktop, formData)) {
  //     setChange(true);
  //   } else {
  //     setChange(false);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData, isChange])

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

  const currentSetting = { ...settings, desktop: formData };

  return (
    <Frame>
      {isChange && <ContextualSaveBar
        alignContentFlush
        message="Unsaved changes"
        saveAction={{
          onAction: () => updateSettings(currentSetting, token as string),
          loading: false,
          disabled: false,
        }}
        discardAction={{
          url: '/app/desktop-settings',
          onAction: () => {
            // shopify.loading(true);
            // setFormData(settings.desktop)
            setChange(() => false);

          }
        }}
      ></ContextualSaveBar>}
      <Page
        backAction={{ content: 'Dashboard', url: '/app' }}
        title="Desktop Settings"
      >
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
                {
                  formData.location.includes("other") && <>
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
                  </>
                }
                <BlockStack gap="200">
                  <Text as="h2" variant="bodyMd">
                    Style
                  </Text>
                  <Grid>
                    <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 2, lg: 2, xl: 2}}>
                      <div onClick={() => setFormData(prev => ({ ...prev, variant: 'style1' }))} style={{ width: 'fit-content', border: `${formData.variant == 'style1' ? '1px solid #ccc' : '1px solid transparent' }`, cursor: 'pointer', borderRadius: '.5rem' }}>
                        <Thumbnail
                          source="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674"
                          size="medium"
                          alt="Style"
                        />
                      </div>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 2, lg: 2, xl: 2}}>
                      <div onClick={() => setFormData(prev => ({ ...prev, variant: 'style2' }))} style={{ width: 'fit-content', border: `${formData.variant == 'style2' ? '1px solid #ccc' : '1px solid transparent' }`, cursor: 'pointer', borderRadius: '.5rem' }}>
                        <Thumbnail
                          source="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674"
                          size="medium"
                          alt="Style"
                        />
                      </div>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 2, lg: 2, xl: 2}}>
                      <div onClick={() => setFormData(prev => ({ ...prev, variant: 'style3' }))} style={{ width: 'fit-content', border: `${formData.variant == 'style3' ? '1px solid #ccc' : '1px solid transparent' }`, cursor: 'pointer', borderRadius: '.5rem' }}>
                        <Thumbnail
                          source="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674"
                          size="medium"
                          alt="Style"
                        />
                      </div>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 2, lg: 2, xl: 2}}>
                      <div onClick={() => setFormData(prev => ({ ...prev, variant: 'style4' }))} style={{ width: 'fit-content', border: `${formData.variant == 'style4' ? '1px solid #ccc' : '1px solid transparent' }`, cursor: 'pointer', borderRadius: '.5rem' }}>
                        <Thumbnail
                          source="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674"
                          size="medium"
                          alt="Style"
                        />
                      </div>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 2, lg: 2, xl: 2}}>
                      <div onClick={() => setFormData(prev => ({ ...prev, variant: 'style5' }))} style={{ width: 'fit-content', border: `${formData.variant == 'style5' ? '1px solid #ccc' : '1px solid transparent' }`, cursor: 'pointer', borderRadius: '.5rem' }}>
                        <Thumbnail
                          source="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674"
                          size="medium"
                          alt="Style"
                        />
                      </div>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 2, lg: 2, xl: 2}}>
                      <div onClick={() => setFormData(prev => ({ ...prev, variant: 'style6' }))} style={{ width: 'fit-content', border: `${formData.variant == 'style6' ? '1px solid #ccc' : '1px solid transparent' }`, cursor: 'pointer', borderRadius: '.5rem' }}>
                        <Thumbnail
                          source="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/currency-style-1.png?v=1703583674"
                          size="medium"
                          alt="Style"
                        />
                      </div>
                    </Grid.Cell>
                  </Grid>
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
    </Frame>
  );
}
