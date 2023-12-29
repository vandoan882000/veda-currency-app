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

export const links = () => [{ rel: "stylesheet", href: indexStyles }];

export default function PricingPage() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleActive}>I have promo code</Button>;
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
          <Grid.Cell>
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h2">Free</Text>
                  <div>
                    <Text variant="headingLg" as="h2">$0,00</Text>
                    <Text variant="bodyLg" as="p">Monthly</Text>
                  </div>
                </InlineStack>
                <Text as="p" variant="bodyLg">Plan includes: </Text>
                <BlockStack gap="200">
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Number of currencies: 3</Text>
                  </InlineStack>
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Auto Detect Currency: false</Text>
                  </InlineStack>
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Checkout Notification: false</Text>
                  </InlineStack>
                </BlockStack>
                <Button variant="primary">Current Plan</Button>
              </BlockStack>
            </Card>

          </Grid.Cell>
          <Grid.Cell>
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h2">Free</Text>
                  <div>
                    <Text variant="headingLg" as="h2">$0,00</Text>
                    <Text variant="bodyLg" as="p">Monthly</Text>
                  </div>
                </InlineStack>
                <Text as="p" variant="bodyLg">Plan includes: </Text>
                <BlockStack gap="200">
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Number of currencies: 3</Text>
                  </InlineStack>
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Auto Detect Currency: false</Text>
                  </InlineStack>
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Checkout Notification: false</Text>
                  </InlineStack>
                  <Button variant="primary">Current Plan</Button>
                </BlockStack>
              </BlockStack>
            </Card>

          </Grid.Cell>
          <Grid.Cell>
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h2">Free</Text>
                  <div>
                    <Text variant="headingLg" as="h2">$0,00</Text>
                    <Text variant="bodyLg" as="p">Monthly</Text>
                  </div>
                </InlineStack>
                <Text as="p" variant="bodyLg">Plan includes: </Text>
                <BlockStack gap="200">
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Number of currencies: 3</Text>
                  </InlineStack>
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Auto Detect Currency: false</Text>
                  </InlineStack>
                  <InlineStack align="start" gap="200">
                    <Icon
                      source={MobileAcceptMajor}
                      tone="base"
                    />
                    <Text as="p" variant="bodyLg">Checkout Notification: false</Text>
                  </InlineStack>
                  <Button variant="primary">Current Plan</Button>
                </BlockStack>
              </BlockStack>
            </Card>

          </Grid.Cell>
        </Grid>
      </BlockStack>

    </Page>
  );
}


