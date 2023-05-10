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
	range
}: TableUIProps) => {
	return (
		<article>
			<table className="table">
				{/**Head table */}
				<thead>
					<tr>
						{/**Head check */}
						{showChecks ? (
							<th className="column-check">
								<Checkbox
									value={checkAll.check}
									onChange={handleCheckAll}
									indeterminate={checkAll.indeterminate}
								/>
							</th>
						) : null}
						{/**Text columns */}
						{columns.map((column) => (
							<th key={column.name}>
								{column.name.charAt(0).toUpperCase() + column.name.slice(1)}
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
