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
            <Checkbox
              label="Round Setting"
              checked={checked}
              onChange={handleChange}
            />
          </BlockStack>
          <BlockStack gap="200">
            <Text variant="headingMd" as="h2">
              Currency Code
            </Text>
            <Text variant="bodySm" as="span">
              Copy the following code and paste to place that you want display the Multi Currency Converter Toolbar manually
            </Text>
            <TextField labelHidden={true} label="a" value={HTML} autoComplete="off" disabled></TextField>
            <Button fullWidth={false} variant="primary">Copy Code</Button>
          </BlockStack>
          <BlockStack gap="200">
            <Text variant="headingMd" as="h2">
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


