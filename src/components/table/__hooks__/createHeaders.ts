import { useRef } from 'react'
import { Column, Header } from '../organism/TableProps'

export const createHeaders = (headers: Header[]): Column[] => {
  return headers.map((item: Header) => ({
    text: item.text,
    ref: useRef(),
    sortable: item.sortable
  }))
}
