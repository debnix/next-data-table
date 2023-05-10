export interface PaginationProps {
  handleChangePage: (changePage: ChangePage) => void
  handleRowPerPage: (newRowsPerPage: number) => void
  pageSizeOptions: number[]
  disableFirst?: boolean
  disableBack?: boolean
  disableNext?: boolean
  disableLast?: boolean
  range?: RangePagination
}

export interface RangePagination {
  from: number
  to: number
  total: number
}

export type ChangePage = 'FIRST' | 'NEXT' | 'BACK' | 'LAST'
