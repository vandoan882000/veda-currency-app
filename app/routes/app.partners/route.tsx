import type { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Card,
  EmptyState,
  Grid,
  Page,
  Text
} from "@shopify/polaris";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { Suspense } from "react";
import { RecommendationItem } from "~/components/RecommendationItem/RecommendationItem";
import { authenticate } from "~/shopify.server";


interface IntegrationApp {
  description: string;
  btnName: string;
  link: string;
  name: string;
  thumbnailUrl: string;
}

interface ResponseSuccess {
  message: string;
  data: IntegrationApp[];
}



export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  const getParnerApp = async () => {
    const response: AxiosResponse<ResponseSuccess> = await axios({
      method: 'get',
      url: 'https://myshopkit.app/wp-json/customer-feedback/v1/app-recommendations?app=multi-currency-converter'
    })
    return response.data.data;
  }
  return defer({
    data: getParnerApp()
  });
};

export default function PartnerPage() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <Page>
      <ui-title-bar title="Partners" />
      <div style={{ paddingBottom: 50 }}>
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h2" variant="headingXl">App Recommendations</Text>
            <Text as="span" variant="bodyLg">We're proud to help you grow your online store with these powerful apps. We provide everything to save your time and grow your bussiness effectively</Text>
          </BlockStack>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={data}>
              {(resolvedValue) => {
                 return <>
                  {resolvedValue?.length ?
                    <Grid
                      columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
                    >
                      {resolvedValue.map((item: IntegrationApp, index: number) => <Grid.Cell key={index}>
                        <RecommendationItem {...item}></RecommendationItem>
                      </Grid.Cell>)}
                    </Grid>
                    :
                    <Card>
                      <EmptyState
                        heading="Empty"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <p>Track and receive your incoming inventory from suppliers.</p>
                      </EmptyState>
                    </Card>
                  }
                </>
              }
              }
            </Await>
          </Suspense>
        </BlockStack>
      </div>
    </Page>
  );
}


