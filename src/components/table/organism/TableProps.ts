import { SelectPaginationProps } from '@/components/table/molecules/select-pagination/SelectPaginationProps'

export interface TableProps extends Omit<SelectPaginationProps, 'callbackSelect'> {
  showChecks: boolean
  headers: Header[]
  rows: Row[]
  minCellWidth: number
  handleCheck?: (rowsChecked: string[]) => void
  pagination?: boolean
  paginationMode?: PaginationServer
}

export interface PaginationServer {
  server: boolean
  totalRows: number
}

export interface Header {
  text: string
  sortable: boolean
}

export interface Row {
  id: string
  columns: React.ReactNode[]
  checked?: boolean
}

export interface CheckAll {
  check: boolean,
  indeterminate: boolean
}

export interface Column extends Header {
  ref: React.MutableRefObject<undefined>
}
