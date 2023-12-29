import {
  BlockStack,
  Button,
  Card,
  Checkbox,
  Page,
  Text,
  TextField
} from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function AdvancedPage() {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );
  const HTML = '<div class="select-currency"></div>';
  return (
    <Page>
      <ui-title-bar title="Advanced" />
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="200">
            <Text variant="headingLg" as="h2">
              Round Setting
            </Text>
            <Checkbox
              label="Round Setting"
              checked={checked}
              onChange={handleChange}
            />
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap="200">
            <Text variant="headingLg" as="h2">
              Currency Code
            </Text>
            <BlockStack gap="300">
              <Text variant="bodyMd" as="span">
                Copy the following code and paste to place that you want display the Multi Currency Converter Toolbar manually
              </Text>
              <TextField labelHidden={true} label="a" value={HTML} autoComplete="off" disabled></TextField>
              <Button fullWidth={false} variant="primary">Copy Code</Button>
            </BlockStack>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap="200">
            <Text variant="headingLg" as="h2">
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
        </Card>
      </BlockStack>
    </Page>
  );
}


