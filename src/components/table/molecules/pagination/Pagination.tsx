import './pagination.scss'
import Firt from '@/components/table/atoms/icons/presentations/Firt'
import Back from '@/components/table/atoms/icons/presentations/Back'
import Next from '@/components/table/atoms/icons/presentations/Next'
import Last from '@/components/table/atoms/icons/presentations/Last'
import SelectPagination from '../select-pagination/SelectPagination'
import { PaginationProps } from './PaginationProps'

const Pagination = ({
	handleChangePage,
	handleRowPerPage,
	pageSizeOptions,
	disableFirst,
	disableBack,
	disableNext,
	disableLast,
	range
}: PaginationProps) => {
	return (
		<div className="pagination">
			<article>
				<span>Rows Per page: </span>
				<SelectPagination
					pageSizeOptions={pageSizeOptions}
					callbackSelect={handleRowPerPage}
				/>
			</article>
			{range ? (
				<span>
					{range.from}-{range.to} of {range.total}
				</span>
			) : null}
			<aside
				className={disableFirst ? 'disable' : 'btn-pagination ripple'}
				onClick={() => {
					disableFirst ? null : handleChangePage('FIRST')
				}}
			>
				<Firt
					width={15}
					height={15}
					color={disableFirst ? '#CCCCCC' : '#000000'}
				/>
			</aside>
			<aside
				className={disableBack ? 'disable' : 'btn-pagination ripple'}
				onClick={() => {
					disableBack ? null : handleChangePage('BACK')
				}}
			>
				<Back
					width={15}
					height={15}
					color={disableBack ? '#CCCCCC' : '#000000'}
				/>
			</aside>
			<aside
				className={disableNext ? 'disable' : 'btn-pagination ripple'}
				onClick={() => {
					disableNext ? null : handleChangePage('NEXT')
				}}
			>
				<Next
					width={15}
					height={15}
					color={disableNext ? '#CCCCCC' : '#000000'}
				/>
			</aside>
			<aside
				className={disableLast ? 'disable' : 'btn-pagination ripple'}
				onClick={() => {
					disableLast ? null : handleChangePage('LAST')
				}}
			>
				<Last
					width={15}
					height={15}
					color={disableLast ? '#CCCCCC' : '#000000'}
				/>
			</aside>
		</div>
	)
}

export default Pagination
