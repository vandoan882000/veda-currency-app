import {
  BlockStack,
  Button,
  Card,
  Grid,
  Icon,
  InlineStack,
  MediaCard,
  Modal,
  Page,
  Text,
  TextField
} from "@shopify/polaris";
import {
  MobileAcceptMajor
} from '@shopify/polaris-icons';

import { useCallback, useState } from "react";
import indexStyles from "./style.css";
import { authenticate } from "~/shopify.server";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";

interface PlanAPIResponseData {
  planName: 'Free' | 'Basic' | 'Business';
  planSlug: string;
  extraInfo: {
    price: string;
    toggleCheckout: string;
    toggleDetectAuto: boolean;
  };
  planInclude: Record<string, any>;
  description: string;
  canUpgrade: boolean;
}

interface ResponseSuccess {
  message: string;
  data: PlanAPIResponseData[];
}

export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  const response: AxiosResponse<ResponseSuccess> = await axios({
    method: 'get',
    url: 'https://multicurrency.myshopkit.app/vge/myshopkit/v1/plans'
  })
  return json(response.data);
};

export default function PricingPage() {
  const [active, setActive] = useState(false);
  const { data } = useLoaderData<typeof loader>();

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleActive}>I have promo code</Button>;

  const formatPrice = (value: number) => {
    const val = (value / 1).toFixed(2).replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return (
    <Page>
      <ui-title-bar title="Pricing" />
      <BlockStack gap="400">
        <MediaCard
          title="About App"
          description="The first and foremost step towards expanding your business globally is making it user-friendly for global customers. Customers from different corners of the world want to see the displayed price in their domestic currency. This helps save them from the hassle of converting currency mentally, especially those who don’t have a head for figures. Thus, customers will feel more comfortable browsing your products and more likely to make a purchase."
          size="small"
        >
          <img
            alt="Pricing"
            width="100%"
            height="100%"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src="https://dashboardmulticurrency.myshopkit.app/assets/sammy-finance-8035c91a.png"
          />
        </MediaCard>
        <InlineStack align="space-between">
          <InlineStack gap="200">
            <Text as="h2" variant="heading2xl">Your current plan:</Text>
            <div style={{color: "red"}}>
              <Text as="strong" variant="heading2xl">Free</Text>
            </div>
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
                value=''
                autoComplete="off"
              />
            </Modal.Section>
          </Modal>
        </InlineStack>
        <Grid
          columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}
        >
          {data.map((item, index) => {
            const texts: string[] = Object.entries(item.planInclude)
            .filter(([key]) => key !== 'price')
            .map(([, { name, value }]) => `${name}: ${value}`);
            // const _percentage = Number(planCode.percentage);
            const _price = Number(item.extraInfo.price);

            let _discount = 0;
            // if (_percentage > 0) {
            //   _discount = Math.floor(_price * ((100 - _percentage) / 100));
            // } else {
            // }
            _discount = _price;
            return <Grid.Cell key={index}>
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text variant="headingLg" as="h2">{item.planName}</Text>
                    <div>
                      <Text variant="headingLg" as="h2">{formatPrice(Number(_discount.toString()))}</Text>
                      <Text variant="bodyLg" as="p">Monthly</Text>
                    </div>
                  </InlineStack>
                  <Text as="p" variant="bodyLg">Plan includes: </Text>
                  <BlockStack gap="200">
                    {texts.map((text, textIndex) => {
                      return (
                        <InlineStack align="start" gap="200" key={textIndex}>
                          <Icon
                            source={MobileAcceptMajor}
                            tone="base"
                          />
                          <Text as="p" variant="bodyLg">{text}</Text>
                        </InlineStack>
                      )
                    })}

                  </BlockStack>
                  <Button variant="primary">Current Plan</Button>
                </BlockStack>
              </Card>
            </Grid.Cell>
          })}

        </Grid>
      </BlockStack>

    </Page>
  );
}


