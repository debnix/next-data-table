'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import './table-resize.scss'

const createHeaders = (headers: any): { text: string; ref: any }[] => {
	return headers.map((item: any) => ({
		text: item,
		ref: useRef()
	}))
}

const Table = ({ headers, minCellWidth, tableContent }: any) => {
	//Total Height of table
	const [tableHeight, setTableHeight] = useState('auto')
	//column index to resize
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const [gridColumns, setGridColumns] = useState<string>('')
	const tableElement = useRef<any>(null)
	const columns = createHeaders(headers)

	useEffect(() => {
		let strGrid: string = ''
		headers.forEach((col: any) => {
			strGrid += ' minmax(50px, 1fr)'
		})
		setGridColumns(strGrid)
		setTableHeight(tableElement.current.offsetHeight)
	}, [])

	const mouseDown = (index: number) => {
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

			tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
				' '
			)}`
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

	return (
		<article className="table-wrapper">
			<table
				className="resizeable-table"
				ref={tableElement}
				style={{ gridTemplateColumns: gridColumns }}
			>
				<thead>
					<tr>
						{columns.map(({ ref, text }: any, i: number) => (
							<th
								ref={ref}
								key={text}
								style={{ minWidth: `${minCellWidth}px` }}
							>
								<span>{text}</span>
								<div
									style={{ height: tableHeight }}
									onMouseDown={() => mouseDown(i)}
									className={`resize-handle ${
										activeIndex === i ? 'active' : 'idle'
									}`}
								/>
							</th>
						))}
					</tr>
				</thead>
				{tableContent}
			</table>
		</article>
	)
}

export default Table
