import type { LoaderFunctionArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Button,
  Card,
  EmptyState,
  Grid,
  InlineStack,
  Link,
  Page,
  Text
} from "@shopify/polaris";
import type { AxiosResponse } from "axios";
import { authenticate } from "~/shopify.server";
import { fetchAPI } from "~/utils/fetchAPI";

type HTML = string;

interface IntegrationApp {
  featuredImage: string;
  description: HTML;
  features?: string[];
  buttonText?: string;
  buttonLink: string;
}

interface ResponseSuccess {
  message: string;
  data: IntegrationApp[];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `https://myshopkit.app/wp-json/ebase/v1/app-integrations/multi-currency-myshopkit`,
    params: { shop: session.shop },
  });
  return json(response.data);
};

export default function PartnerPage() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <Page>
      <ui-title-bar title="Partners" />
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingXl">App Recommendations</Text>
          <Text as="span" variant="bodyLg">We're proud to help you grow your online store with these powerful apps. We provide everything to save your time and grow your bussiness effectively</Text>
        </BlockStack>
        {data?.length ?
          <Card>
            <EmptyState
              heading="Empty"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Track and receive your incoming inventory from suppliers.</p>
            </EmptyState>
          </Card>
          :
          <Grid
            columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          >
            <Grid.Cell>
              <Card>
                <img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Myshopkit_1200x400_423333de-8800-4557-b1bd-5bc63cfe2569.jpg?v=1699589254" alt="" />
                <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">
                  <Text as="h3" variant="headingMd">Lai Product Reviews</Text>
                </Link>
                <InlineStack blockAlign="center" align="space-between">
                  <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">More info</Link>
                  <Button>Get App</Button>
                </InlineStack>
              </Card>
            </Grid.Cell>
            <Grid.Cell>
              <Card>
                <img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Myshopkit_1200x400_423333de-8800-4557-b1bd-5bc63cfe2569.jpg?v=1699589254" alt="" />
                <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">
                  <Text as="h3" variant="headingMd">Lai Product Reviews</Text>
                </Link>
                <InlineStack blockAlign="center" align="space-between">
                  <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">More info</Link>
                  <Button>Get App</Button>
                </InlineStack>
              </Card>
            </Grid.Cell>
            <Grid.Cell>
              <Card>
                <img style={{width: '100%'}} src="https://cdn.shopify.com/s/files/1/0732/6416/9268/files/Myshopkit_1200x400_423333de-8800-4557-b1bd-5bc63cfe2569.jpg?v=1699589254" alt="" />
                <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">
                  <Text as="h3" variant="headingMd">Lai Product Reviews</Text>
                </Link>
                <InlineStack blockAlign="center" align="space-between">
                  <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">More info</Link>
                  <Button>Get App</Button>
                </InlineStack>
              </Card>
            </Grid.Cell>
          </Grid>
        }
      </BlockStack>
    </Page>
  );
}


