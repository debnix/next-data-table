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

export const STEPS_CHANGE_PAGE = {
  FIRST: 'FIRST', NEXT: 'NEXT', BACK: 'BACK', LAST: 'LAST'
}

export type ChangePage = keyof typeof STEPS_CHANGE_PAGE

