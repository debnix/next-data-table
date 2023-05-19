import { useRef } from 'react'

export const createHeaders = (headers: string[]) => {
  return headers.map((item: any) => ({
    text: item,
    ref: useRef()
  }))
}
