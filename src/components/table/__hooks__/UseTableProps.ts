import { CreateHeadersProps } from './CreateHeadersProps'

export interface UseTableProps {
  headers: CreateHeadersProps[]
  minCellWidth: number
  showChecks: boolean
}

export interface HeadersTable {
  text: string
  ref: React.MutableRefObject<undefined>
}
