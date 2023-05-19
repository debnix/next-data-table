import './table-head.scss'
import Checkbox from '../../atoms/checkbox/Checkbox'
import { TableHeadProps } from './TableHeadProps'

const TableHead = ({ showChecks, columns, checkHead }: TableHeadProps) => {
	console.log({ checkHead })
	return (
		<thead className="thead">
			<tr>
				{/**Head check */}
				{showChecks ? (
					<th className="column-check">
						<Checkbox
							defaultChecked={checkHead.check}
							value={checkHead.check}
							onChange={showChecks.handleCheck}
							indeterminate={checkHead.indeterminate}
						/>
					</th>
				) : null}
				{/**Text columns */}
				{columns.map((column) => (
					<th key={column.name} className="column-head">
						{column.name.charAt(0).toUpperCase() + column.name.slice(1)}
					</th>
				))}
			</tr>
		</thead>
	)
}

export default TableHead
