import './table-head.scss'
import Checkbox from '../../atoms/checkbox/Checkbox'
import { TableHeadProps } from './TableHeadProps'

const TableHead = ({
	showChecks,
	checkHead,
	tableHeight,
	columns,
	mouseDown,
	activeIndex
}: TableHeadProps) => {
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
				{columns.map(({ ref, text }: any, i: number) => (
					<th ref={ref} key={text}>
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
	)
}

export default TableHead
