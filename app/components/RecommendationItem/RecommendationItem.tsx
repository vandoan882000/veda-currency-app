import { BlockStack, Button, Card, InlineStack, Link, Text } from '@shopify/polaris';
import type { FC } from 'react';

interface RecommendationItemProps {
  name: string;
  link: string;
  btnName: string;
  thumbnailUrl: string;
}

export const RecommendationItem: FC<RecommendationItemProps> = ({ name, link, thumbnailUrl, btnName }) => {
  return (
    <Card>
      <BlockStack gap='200'>
        <div style={{ width: '100%', paddingTop: '33%', position: 'relative', borderRadius: 5, overflow: 'hidden' }}>
          <img style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover'}} src={thumbnailUrl} alt={name} />
        </div>
        <Link removeUnderline target="_blank" url="https://apps.shopify.com/lai-reviews?utm_source=Veda&utm_medium=in-app&utm_campaign=integration">
          <Text as="h3" variant="headingMd">{name}</Text>
        </Link>
        <InlineStack blockAlign="center" align="space-between">
          <Link removeUnderline target='_blank' url={link}>More info</Link>
          <Button onClick={() => window.open(link, "_blank")}>{btnName}</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  )
}
