import Checkbox from '../atoms/checkbox/Checkbox'
import Pagination from '@/components/table/molecules/pagination/Pagination'
import './table.scss'
import { TableUIProps } from './TableProps'

const TableUI = ({
	columns,
	rows,
	showChecks,
	handleCheckChange,
	handleCheckAll,
	checkAll,
	pagination,
	handleChangePage,
	handleRowPerPage,
	pageSizeOptions,
	disableNext,
	disableBack,
	range,
	gridColumns,
	minCellWidth,
	tableElement,
	tableHeight,
	activeIndex,
	mouseDown,
	columnCheckElement
}: TableUIProps) => {
	return (
		<article className="table-wrapper">
			<table
				className="resizeable-table"
				ref={tableElement}
				style={{ gridTemplateColumns: gridColumns }}
			>
				{/**Head table */}
				<thead>
					<tr>
						{/**Head check */}
						{showChecks ? (
							<th className="column-check" ref={columnCheckElement}>
								<Checkbox
									value={checkAll.check}
									onChange={handleCheckAll}
									indeterminate={checkAll.indeterminate}
								/>
							</th>
						) : null}
						{/**Text columns */}
						{/* {columns.map((column) => (
							<th key={column.name} style={{ minWidth: `${minCellWidth}px` }}>
								{column.name.charAt(0).toUpperCase() + column.name.slice(1)}
							</th>
						))} */}
						{columns.map(({ ref, text }: any, index: number) => (
							<th
								ref={ref}
								key={`${text}-${showChecks ? index + 1 : index}`}
								style={{ minWidth: `${minCellWidth}px` }}
							>
								<span>{text}</span>
								<div
									style={{ height: tableHeight }}
									onMouseDown={() => mouseDown(showChecks ? index + 1 : index)}
									className={`resize-handle ${
										activeIndex === (showChecks ? index + 1 : index)
											? 'active'
											: 'idle'
									}`}
								/>
							</th>
						))}
					</tr>
				</thead>
				{/**Body table */}
				<tbody>
					{rows.map((row) => (
						<tr key={row.id}>
							{/**Check */}
							{showChecks ? (
								<td className="column-check">
									<Checkbox
										key={`checkbox-${row.id}`}
										value={row.checked}
										defaultChecked={row.checked}
										onChange={(event) => handleCheckChange(row.id, event)}
									/>
								</td>
							) : null}
							{/**text row-column */}
							{row.columns.map((value, index) => (
								<td key={`row${row.id}-column${index}`}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{pagination ? (
				<Pagination
					handleChangePage={handleChangePage}
					handleRowPerPage={handleRowPerPage}
					pageSizeOptions={pageSizeOptions}
					disableNext={disableNext}
					disableLast={disableNext}
					disableFirst={disableBack}
					disableBack={disableBack}
					range={range}
				/>
			) : null}
		</article>
	)
}

export default TableUI
