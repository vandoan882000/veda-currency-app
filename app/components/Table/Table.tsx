import {
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
      '$875.00',
    ],
    [
      <Link
        removeUnderline
        url="https://www.example.com"
        key="mobile-settings"
      >
        Mobile Settings
      </Link>,
      '$230.00',
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
