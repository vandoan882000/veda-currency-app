import {
  BlockStack,
  Box,
  Card,
  MediaCard,
  Page,
  Text,
  VideoThumbnail
} from "@shopify/polaris";

export default function AdvancedPage() {
  return (
    <Page>
      <ui-title-bar title="FAQs" />
      <div style={{ paddingBottom: 50 }}>
        <BlockStack gap="500">
          <MediaCard
            title="How can I add the App section to my store?"
            primaryAction={{
              content: 'Learn more',
              onAction: () => {},
            }}
            description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
            popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
          >
            <VideoThumbnail
              videoLength={80}
              thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
              onClick={() => console.log('clicked')}
            />
          </MediaCard>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingLg" as="h2">How does Multi currency Converter work</Text>
              <Text variant="bodyLg" as="p">Multi Currency Converter automatically converts currency at any place within your shop regardless of the format. Whether you use a third-party app like Mini Cart or fill content marketing with the product’s price, our Multi Currency Converter app takes it in stride.</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingLg" as="h2">How can I pick up a list of currencies myself?</Text>
              <Box>
                <Text variant="bodyLg" as="p">Step 1: Click on Settings Tab</Text>
                <Text variant="bodyLg" as="p">Step 2: Choose Select Currencies mode under Select Currencies setting.</Text>
                <Text variant="bodyLg" as="p">Step 3: Finally, choose currencies that you want to displays</Text>
              </Box>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingLg" as="h2">How can I add Multi Currency Converter Toolbar to a placement on my shop such as Bottom-Left, Top-Left, etc ... ?</Text>
              <Box>
                <Text variant="bodyLg" as="p">Step 1: Still under Settings Tab, check on Add one more placement</Text>
                <Text variant="bodyLg" as="p">Step 2: The Placement setting is appeared after that → You can now select a placement with this setting.</Text>
              </Box>
            </BlockStack>
          </Card>
        </BlockStack>
      </div>
    </Page>
  );
}


