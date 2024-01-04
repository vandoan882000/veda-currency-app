import {
  Badge,
  DataTable,
  Link,
  useBreakpoints
} from '@shopify/polaris';

export const Table = () => {
  const rows = [
    [
      <Link
        removeUnderline
        url="https://www.example.com"
        key="desktop-settings"
      >
        Desktop Settings
      </Link>,
      <Badge key='desktop-settings-status' size="small" tone="success">On</Badge>,
    ],
    [
      <Link
        removeUnderline
        url="https://www.example.com"
        key="mobile-settings"
      >
        Mobile Settings
      </Link>,
      <Badge key='mobile-settings-status' size="small" tone="success">On</Badge>,
    ],
  ];
  const {lgDown} = useBreakpoints();
  const fixedFirstColumns = lgDown ? 2 : 0;

  return (
    <DataTable
      columnContentTypes={[
        'text',
        'numeric',
      ]}
      headings={[
        'Page',
        'Status',
      ]}
      rows={rows}
      sortable={[false, false]}
      defaultSortDirection="descending"
      initialSortColumnIndex={4}
      stickyHeader
      fixedFirstColumns={fixedFirstColumns}
    />
  );
}
