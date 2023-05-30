'use client'
import { useEffect, useState } from 'react'
import { CheckAll, TableProps, Row } from './TableProps'
import {
	ChangePage,
	RangePagination
} from '@/components/table/molecules/pagination/PaginationProps'
import useTable from '../__hooks__/useTable'

const useTableController = ({
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
	const {
		tableElement,
		columns,
		tableHeight,
		activeIndex,
		mouseDown,
		columnCheckElement,
		gridColumns
	} = useTable({ headers, minCellWidth, showChecks })
	const [rangePagination, setRangePagination] = useState<RangePagination>({
		from: 0,
		to: 0,
		total: 0
	})
	const [checkAll, setCheckAll] = useState<CheckAll>({
		check: false,
		indeterminate: false
	})

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
				? paginationMode.totalRows <= pageSizeOptions[0]
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

	const handleChangePage = (changePage: ChangePage) => {
		//Get total rows of local or server
		const totalRows =
			paginationMode && paginationMode.server
				? paginationMode.totalRows
				: rows.length
		//create object with pagination functions
		const paginationFuncions = {
			NEXT: () => {
				const temporalPointer = pointerRowPosition + rowsPerPage
				let endPosition =
					temporalPointer > totalRows ? totalRows : temporalPointer
				//if pagination is local
				if (!paginationMode?.server) {
					setRowsState(rows.slice(pointerRowPosition, endPosition))
				}
				setPointerRowPosition(endPosition)
				setDisableBack(pointerRowPosition <= 0)
				setDisableNext(endPosition === totalRows)
				setRangePagination({
					...rangePagination,
					from: pointerRowPosition + 1,
					to: endPosition
				})
			},
			BACK: () => {
				const mathPagination = pointerRowPosition % rowsPerPage
				const endPosition = paginationMode?.server
					? mathPagination === 0
						? pointerRowPosition - rowsPerPage
						: pointerRowPosition - mathPagination
					: pointerRowPosition - rowsState.length
				const startPosition = endPosition - rowsPerPage
				//if pagination is local
				if (!paginationMode?.server) {
					setRowsState(rows.slice(startPosition, endPosition))
				}
				setPointerRowPosition(endPosition)
				setDisableBack(startPosition <= 0)
				setDisableNext(false)
				setRangePagination({
					...rangePagination,
					from: startPosition + 1,
					to: endPosition
				})
			},
			FIRST: () => {
				handleRowPerPage(rowsPerPage)
				if (paginationMode?.server) {
					setDisableNext(rowsState.length >= paginationMode?.totalRows)
				}
			},
			LAST: () => {
				const endPosition = paginationMode?.server
					? paginationMode.totalRows
					: rows.length
				const quantityRows = endPosition % rowsPerPage
				const startPosition =
					quantityRows == 0
						? endPosition - rowsPerPage
						: endPosition - quantityRows
				if (!paginationMode?.server) {
					setRowsState(rows.slice(startPosition, endPosition))
				}
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
		//call pagination functions
		const turnPage = paginationFuncions[changePage]
		turnPage()
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

	return {
		columns,
		handleCheckChange,
		rows: rowsState,
		showChecks,
		handleCheckAll,
		checkAll,
		pageSizeOptions,
		pagination,
		handleChangePage,
		handleRowPerPage,
		disableNext,
		disableBack,
		range: rangePagination,
		gridColumns,
		minCellWidth,
		tableElement,
		tableHeight,
		activeIndex,
		mouseDown,
		columnCheckElement
	}
}

export default useTableController
