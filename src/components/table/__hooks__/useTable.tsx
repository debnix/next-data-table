'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { UseTableProps } from './UseTableProps'
import { createHeaders } from './createHeaders'

const useTable = ({ headers, minCellWidth }: UseTableProps) => {
	//Total Height of table
	const [tableHeight, setTableHeight] = useState('auto')
	//column index to resize
	const [activeIndex, setActiveIndex] = useState(null)
	const tableElement = useRef<HTMLTableElement>(null)
	const columns = createHeaders(headers)

	useEffect(() => {
		if (tableElement.current) {
			const height: number = tableElement.current.offsetHeight
			setTableHeight(`${height}px`)
		}
	}, [])

	const mouseDown = (index: any) => {
		setActiveIndex(index)
	}

	const mouseMove = useCallback(
		(e: any) => {
			const gridColumns = columns.map((col: any, i: number) => {
				if (i === activeIndex) {
					const width = e.clientX - col.ref.current.offsetLeft

					if (width >= minCellWidth) {
						return `${width}px`
					}
				}
				return `${col.ref.current.offsetWidth}px`
			})
			if (tableElement.current) {
				tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
					' '
				)}`
			}
		},
		[activeIndex, columns, minCellWidth]
	)

	const removeListeners = useCallback(() => {
		window.removeEventListener('mousemove', mouseMove)
		window.removeEventListener('mouseup', removeListeners)
	}, [mouseMove])

	const mouseUp = useCallback(() => {
		setActiveIndex(null)
		removeListeners()
	}, [setActiveIndex, removeListeners])

	useEffect(() => {
		if (activeIndex !== null) {
			window.addEventListener('mousemove', mouseMove)
			window.addEventListener('mouseup', mouseUp)
		}

		return () => {
			removeListeners()
		}
	}, [activeIndex, mouseMove, mouseUp, removeListeners])

	return { tableElement, columns, tableHeight, activeIndex, mouseDown }
}

export default useTable
