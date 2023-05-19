import { HeadersTable } from '../../__hooks__/UseTableProps'

export interface TableHeadProps {
  showChecks?: ShowChecks
  checkHead: CheckHead
  columns: HeadersTable[] //columns with ref
  tableHeight: string //table height in px
  activeIndex: number | null
  mouseDown: (index: number) => void
}

export interface ShowChecks {
  show: boolean
  handleCheck: (check: boolean) => void
}

export interface CheckHead {
  check: boolean,
  indeterminate: boolean
}
