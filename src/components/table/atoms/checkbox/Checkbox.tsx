'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import './checkbox.scss'
import { CheckboxProps } from './CheckboxProps'

const Checkbox = ({
	onChange,
	value,
	indeterminate,
	defaultChecked
}: CheckboxProps) => {
	const [check, setCheck] = useState<boolean>(false)
	const checkbox = useRef(null)

	useEffect(() => {
		setCheck(value ? true : false)
		checkbox.current.indeterminate = indeterminate
	}, [value, indeterminate])

	useEffect(() => {
		setCheck(defaultChecked ? true : false)
	}, [])

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value: boolean = event.target.checked
		setCheck(value)
		onChange(value)
	}

	return (
		<input
			className="input"
			type="checkbox"
			ref={checkbox}
			checked={check}
			onChange={handleChange}
		/>
	)
}

export default Checkbox
