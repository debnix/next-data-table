export interface SelectPaginationProps {
  pageSizeOptions: number[]
  callbackSelect: (rowsPerPage: number) => void
}
