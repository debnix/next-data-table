export interface TableHeadProps {
  showChecks?: ShowChecks
  columns: Column[]
  checkHead: CheckHead
}

export interface ShowChecks {
  show: boolean
  handleCheck: (check: boolean) => void
}

export interface Column {
  name: string
  sortable: boolean
}

export interface CheckHead {
  check: boolean,
  indeterminate: boolean
}
