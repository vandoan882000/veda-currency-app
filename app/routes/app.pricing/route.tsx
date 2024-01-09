import {
  BlockStack,
  Button,
  Card,
  Grid,
  Icon,
  InlineStack,
  Modal,
  Page,
  Text,
  TextField
} from "@shopify/polaris";
import {
  CancelMajor,
  TickMinor
} from '@shopify/polaris-icons';


import { type LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { Suspense, useCallback, useState } from "react";
import { authenticate } from "~/shopify.server";
import { fetchAPI } from "~/utils/fetchAPI";
import indexStyles from "./style.css";

interface Feature {
  key: string;
  value: string;
  label: string;
}

interface PlanAPIResponseData {
  name: 'Free' | 'Basic' | 'Business';
  handle: 'free' | 'basic' | 'business';
  regularPrice: number;
  features: Feature[];
}

interface ResponseSuccess {
  message: string;
  data: PlanAPIResponseData[];
}

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
  const plan = await fetchAPI.request({
    url: `api/v1/me/info`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${signup.data.data.token}`
    }
  })
  const getPricing = async () => {
    const response: AxiosResponse<ResponseSuccess> = await axios({
      method: 'get',
      url: 'https://v2-multi-currency-converter.myshopkit.app/api/v1/publish/pricings'
    })
    return response.data.data;
  }
  return defer({
    data: getPricing(),
    plan: plan.data.data.plan,
    token: signup.data.data.token
  });
};

export default function PricingPage() {
  const [active, setActive] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const { data, plan, token } = useLoaderData<typeof loader>();

  const updatePricing = async (handle: string) => {
    const response = await fetchAPI.request({
      url: `api/v1/me/plans/subscription-url`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        "planHandle": handle,
        "returnUrl": 'https://admin.shopify.com/store/lemanhtuong/apps/tuong-currency/app/pricing',
        "discountCode": discountCode
      }
    })
    console.log(response.data.data);
  }

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleActive}>I have promo code</Button>;

  const formatPrice = (value: number) => {
    const val = (value / 1).toFixed(2).replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return (
    <Page>
      <ui-title-bar title="Pricing" />
      <BlockStack gap="500">
        <InlineStack align="space-between">
          <InlineStack gap="200">
            <Text as="h2" variant="heading2xl">Your current plan:</Text>
            <Text as="strong" tone="success" variant="heading2xl">{ plan.name }</Text>
          </InlineStack>
          <Modal
            size="small"
            activator={activator}
            open={active}
            onClose={toggleActive}
            title="Enter Promo code here"
            primaryAction={{
              content: 'Apply',
              onAction: toggleActive,
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: toggleActive,
              },
            ]}
          >
            <Modal.Section>
              <TextField
                label="Promo code"
                value={discountCode}
                onChange={(value: string) => setDiscountCode(value)}
                autoComplete="off"
              />
            </Modal.Section>
          </Modal>
        </InlineStack>
        <Grid
          columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={data}>
              {(resolvedValue) => <>
                {resolvedValue.map((item: PlanAPIResponseData, index: number) => {

                  let _discount = 0;
                  // if (_percentage > 0) {
                  //   _discount = Math.floor(_price * ((100 - _percentage) / 100));
                  // } else {
                  // }
                  _discount = item.regularPrice;
                  return <Grid.Cell key={index}>
                    <Card>
                      <BlockStack gap='600'>
                        <BlockStack gap="300">
                          <InlineStack align="space-between">
                            <Text variant="headingLg" as="h2">{item.name}</Text>
                            <div>
                              <Text variant="headingLg" as="h2">${formatPrice(Number(_discount.toString()))}</Text>
                              <Text variant="bodyLg" as="p">Monthly</Text>
                            </div>
                          </InlineStack>
                          <Text as="p" variant="bodyLg">Plan includes: </Text>
                          <BlockStack gap="200">
                            {item.features.map(feature => {
                              return (
                                feature.value == 'disable' ?
                                <InlineStack align="start" gap="200" key={feature.key}>
                                  <Icon
                                    source={CancelMajor}
                                    tone="critical"
                                  />
                                  <Text as="p" variant="bodyLg">{feature.label}</Text>
                                </InlineStack> :
                                <InlineStack align="start" gap="200" key={feature.key}>
                                  <Icon
                                    source={TickMinor}
                                    tone="success"
                                  />
                                  <Text as="p" variant="bodyLg">{feature.value != 'enable' ? feature.value : ''} {feature.label}</Text>
                                </InlineStack>
                              )
                            })}

                          </BlockStack>
                        </BlockStack>
                        {item.handle == plan.handle ?
                        <Button>Current Plan</Button>
                        :
                        <Button variant="primary" onClick={() => updatePricing(item.handle)}>Choose Plan</Button>}
                      </BlockStack>
                    </Card>
                  </Grid.Cell>
                })}
              </>}
            </Await>
          </Suspense>

        </Grid>
      </BlockStack>

    </Page>
  );
}


