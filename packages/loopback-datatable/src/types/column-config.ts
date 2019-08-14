export interface ColumnConfig {
  key: string;
  title: string;
  type: string;
  sortable?: boolean;
  render?: (row: any) => string;
}
