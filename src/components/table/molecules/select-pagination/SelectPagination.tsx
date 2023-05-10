'use client'
import { ChangeEvent, useState } from 'react'
import './selectPagination.scss'
import { SelectPaginationProps } from './SelectPaginationProps'

const SelectPagination = ({
	pageSizeOptions,
	callbackSelect
}: SelectPaginationProps) => {
	const [value, setValue] = useState<string>()

	const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		const selected = event.target.value
		setValue(selected)
		callbackSelect(parseInt(selected))
	}

	return (
		<select className="selectPagination" value={value} onChange={handleSelect}>
			{pageSizeOptions.map((option, index) => (
				<option key={index}>{option}</option>
			))}
		</select>
	)
}

export default SelectPagination
