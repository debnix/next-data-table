import { useRef } from 'react'
import { HeadersTable } from './UseTableProps'
import { CreateHeadersProps } from './CreateHeadersProps'

export const createHeaders = (headers: CreateHeadersProps[]): HeadersTable[] => {
  return headers.map((item: CreateHeadersProps) => ({
    text: item.text,
    ref: useRef(),
    sortable: item.sortable
  }))
}
