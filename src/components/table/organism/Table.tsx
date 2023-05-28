'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckAll, TableProps, Row, Column, Header } from './TableProps'
import TableUI from './TableUI'
import {
	ChangePage,
	RangePagination
} from '@/components/table/molecules/pagination/PaginationProps'

const createHeaders = (headers: Header[]): Column[] => {
	return headers.map((item: Header) => ({
		text: item.text,
		ref: useRef(),
		sortable: item.sortable
	}))
}

const Table = ({
	headers,
	rows,
	showChecks,
	handleCheck,
	pageSizeOptions,
	pagination,
	paginationMode,
	minCellWidth
}: TableProps) => {
	const [pointerRowPosition, setPointerRowPosition] = useState(0)
	const [rowsChecked, setRowsChecked] = useState<string[]>([])
	const [rowsState, setRowsState] = useState<Row[]>([])
	const [rowsPerPage, setRowsPerPage] = useState(0)
	const [disableNext, setDisableNext] = useState<boolean>(false)
	const [disableBack, setDisableBack] = useState<boolean>(false)
	const [gridColumns, setGridColumns] = useState<string>('')
	//Total Height of table
	const [tableHeight, setTableHeight] = useState('auto')
	//column index to resize
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const tableElement = useRef<HTMLTableElement>(null)
	const columnCheckElement = useRef<HTMLTableCellElement>(null)
	const columns = createHeaders(headers)

	const [rangePagination, setRangePagination] = useState<RangePagination>({
		from: 0,
		to: 0,
		total: 0
	})
	const [checkAll, setCheckAll] = useState<CheckAll>({
		check: false,
		indeterminate: false
	})

	/************* */
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

	/************** */

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

	useEffect(() => {
		//Get rows checked
		const checked: string[] = rows
			.filter((row) => row.checked)
			.map((row) => row.id)
		//Set states
		const temporalRows = rows.slice(0, pageSizeOptions[0])
		setRowsChecked(checked)
		setRowsPerPage(pageSizeOptions ? pageSizeOptions[0] : rows.length)
		setRowsState(pageSizeOptions ? temporalRows : rows)
		setCheckAll({
			...checkAll,
			check: checked.length === rows.length,
			indeterminate: checked.length > 0 && checked.length < rows.length
		})
		setPointerRowPosition(pageSizeOptions[0])
		setDisableBack(true)
		setDisableNext(
			paginationMode?.server
				? paginationMode.totalRows <= rows.length
				: pageSizeOptions[0] >= rows.length
		)
		setRangePagination({
			from: 1,
			to: temporalRows.length,
			total: paginationMode ? paginationMode.totalRows : rows.length
		})
	}, [rows])

	const handleCheckChange = (idRow: string, checked: boolean) => {
		if (handleCheck) {
			let checks = []
			checks = checked
				? [...rowsChecked, idRow]
				: rowsChecked.filter((row) => row !== idRow)
			setCheckAll({
				check: checks.length === rowsState.length ? true : false,
				indeterminate: checks.length > 0 && checks.length < rowsState.length
			})
			setRowsChecked(checks)
			handleCheck(checks)
			setRowsState(
				rowsState.map((row) => {
					const resp: Row = idRow === row.id ? { ...row, checked } : row
					return resp
				})
			)
		}
	}

	const handleCheckAll = (event: boolean) => {
		if (handleCheck) {
			const checks: string[] = event ? rows.map((row) => row.id) : []
			setRowsChecked(checks)
			handleCheck(checks)
			setCheckAll({
				check: event,
				indeterminate: false
			})
			setRowsState(
				rowsState.map((row) => {
					const resp: Row = { ...row, checked: event }
					return resp
				})
			)
		} else {
			setCheckAll({ check: false, indeterminate: false })
		}
	}

	const handleChangePageServer = (changePage: ChangePage) => {
		if (paginationMode?.server) {
			if (changePage === 'NEXT') {
				const temporalPointer = pointerRowPosition + rowsPerPage
				let endPosition =
					temporalPointer > paginationMode.totalRows
						? paginationMode.totalRows
						: temporalPointer
				setDisableBack(pointerRowPosition <= 0)
				setDisableNext(endPosition === paginationMode.totalRows)
				setPointerRowPosition(endPosition)
				setRangePagination({
					...rangePagination,
					from: pointerRowPosition + 1,
					to: endPosition
				})
			} else if (changePage === 'BACK') {
				const endPosition = pointerRowPosition - rows.length
				const startPosition = endPosition - rowsPerPage
				setPointerRowPosition(endPosition)
				setDisableBack(startPosition <= 0)
				setDisableNext(false)
				setRangePagination({
					...rangePagination,
					from: startPosition + 1,
					to: endPosition
				})
			} else if (changePage === 'FIRST') {
				handleRowPerPage(rowsPerPage)
				setDisableNext(rows.length >= paginationMode?.totalRows)
			} else if (changePage === 'LAST') {
				const endPosition = paginationMode.totalRows
				const quantityRows = endPosition % rowsPerPage
				const startPosition =
					quantityRows == 0
						? endPosition - rowsPerPage
						: endPosition - quantityRows
				setPointerRowPosition(endPosition)
				setDisableNext(true)
				setDisableBack(false)
				setRangePagination({
					...rangePagination,
					from: startPosition + 1,
					to: endPosition
				})
			}
		}
	}

	const handleChangelocal = (changePage: ChangePage) => {
		if (changePage === 'NEXT') {
			const temporalPointer = pointerRowPosition + rowsPerPage
			let endPosition =
				temporalPointer > rows.length ? rows.length : temporalPointer
			setRowsState(rows.slice(pointerRowPosition, endPosition))
			setDisableBack(pointerRowPosition <= 0)
			setDisableNext(endPosition === rows.length)
			setPointerRowPosition(endPosition)
			setRangePagination({
				...rangePagination,
				from: pointerRowPosition + 1,
				to: endPosition
			})
		} else if (changePage === 'BACK') {
			const endPosition = pointerRowPosition - rowsState.length
			const startPosition = endPosition - rowsPerPage
			setRowsState(rows.slice(startPosition, endPosition))
			setPointerRowPosition(endPosition)
			setDisableBack(startPosition <= 0)
			setDisableNext(false)
			setRangePagination({
				...rangePagination,
				from: startPosition + 1,
				to: endPosition
			})
		} else if (changePage === 'FIRST') {
			handleRowPerPage(rowsPerPage)
		} else if (changePage == 'LAST') {
			const endPosition = rows.length
			const quantityRows = rows.length % rowsPerPage
			const startPosition =
				quantityRows == 0
					? endPosition - rowsPerPage
					: endPosition - quantityRows
			setRowsState(rows.slice(startPosition, endPosition))
			setPointerRowPosition(endPosition)
			setDisableNext(true)
			setDisableBack(false)
			setRangePagination({
				...rangePagination,
				from: startPosition + 1,
				to: endPosition
			})
		}
	}

	const handleChangePage = (changePage: ChangePage) => {
		if (paginationMode?.server) {
			handleChangePageServer(changePage)
		} else {
			handleChangelocal(changePage)
		}
	}
	const handleRowPerPage = (newRowsPerPage: number) => {
		const startPosition = 0
		const endPosition =
			newRowsPerPage >= rows.length
				? newRowsPerPage
				: startPosition + newRowsPerPage
		setRowsState(rows.slice(startPosition, endPosition))
		setRowsPerPage(newRowsPerPage)
		setPointerRowPosition(endPosition)
		setDisableNext(endPosition >= rows.length || newRowsPerPage >= rows.length)
		setDisableBack(newRowsPerPage <= rows.length || startPosition <= 0)
		setRangePagination({
			...rangePagination,
			from: startPosition + 1,
			to: endPosition
		})
	}

	return (
		<TableUI
			columns={columns}
			handleCheckChange={handleCheckChange}
			rows={rowsState}
			showChecks={showChecks}
			handleCheckAll={handleCheckAll}
			checkAll={checkAll}
			pageSizeOptions={pageSizeOptions}
			pagination={pagination}
			handleChangePage={handleChangePage}
			handleRowPerPage={handleRowPerPage}
			disableNext={disableNext}
			disableBack={disableBack}
			range={rangePagination}
			gridColumns={gridColumns}
			minCellWidth={minCellWidth}
			tableElement={tableElement}
			tableHeight={tableHeight}
			activeIndex={activeIndex}
			mouseDown={mouseDown}
			columnCheckElement={columnCheckElement}
		/>
	)
}

export default Table
