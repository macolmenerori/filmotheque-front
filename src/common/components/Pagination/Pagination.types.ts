export type PaginationProps = {
  currentPage: number;
  perPage: number;
  totalEntries: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};
