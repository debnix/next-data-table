import { useState, useCallback, useEffect, useRef } from 'react'
import { UseTableProps } from './UseTableProps'
import { createHeaders } from './createHeaders'

const useTable = ({ headers, minCellWidth, showChecks }: UseTableProps) => {
	//Total Height of table
	const [tableHeight, setTableHeight] = useState('auto')
	//column index to resize
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const tableElement = useRef<HTMLTableElement>(null)
	const columnCheckElement = useRef<HTMLTableCellElement>(null)
	const [gridColumns, setGridColumns] = useState<string>('')
	const columns = createHeaders(headers)

	useEffect(() => {
		if (tableElement.current) {
			const height: number = tableElement.current.offsetHeight
			setTableHeight(`${height}px`)
		}
	}, [])

	const mouseDown = (index: number) => {
		setActiveIndex(index)
	}

	const mouseMove = useCallback(
		(e: any) => {
			let gridColumns = []
			gridColumns = columns.map((col: any, i: number) => {
				if ((showChecks ? i + 1 : i) === activeIndex) {
					const width = e.clientX - col.ref.current.offsetLeft

					if (width >= minCellWidth) {
						return `${width}px`
					}
				}
				return `${col.ref.current.offsetWidth}px`
			})
			{
				/**Validate if check column is visible */
			}
			if (showChecks && columnCheckElement.current) {
				gridColumns = [
					`${columnCheckElement.current.offsetWidth}px`,
					...gridColumns
				]
			}

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

	useEffect(() => {
		let strGrid: string = showChecks ? ' minmax(60px, 0.2fr)' : ''
		columns.forEach((col) => {
			strGrid += ' minmax(60px, 1fr)'
		})
		setGridColumns(strGrid)
		if (tableElement.current) {
			setTableHeight(`${tableElement.current.offsetHeight}px`)
		}
	}, [columns])

	return {
		tableElement,
		columns,
		tableHeight,
		activeIndex,
		mouseDown,
		columnCheckElement,
		gridColumns
	}
}

export default useTable
