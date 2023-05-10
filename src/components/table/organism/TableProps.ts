import { PaginationProps } from '@/components/table/molecules/pagination/PaginationProps'
import { SelectPaginationProps } from '@/components/table/molecules/select-pagination/SelectPaginationProps'

export interface TableProps extends Omit<SelectPaginationProps, 'callbackSelect'> {
  showChecks: boolean
  columns: Column[]
  rows: Row[]
  handleCheck?: (rowsChecked: string[]) => void
  pagination?: boolean
  paginationMode?: PaginationServer
}

export interface PaginationServer {
  server: boolean
  totalRows: number
}

export interface Column {
  name: string
  sortable: boolean
}

export interface Row {
  id: string
  columns: string[]
  checked?: boolean
}

export interface CheckAll {
  check: boolean,
  indeterminate: boolean
}

export interface TableUIProps extends TableProps, PaginationProps {
  handleCheckChange: (idRow: string, checked: boolean) => void,
  handleCheckAll: (event: boolean) => void,
  checkAll: CheckAll
}


