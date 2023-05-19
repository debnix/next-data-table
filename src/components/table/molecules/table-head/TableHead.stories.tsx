import { ComponentMeta, ComponentStory } from '@storybook/react'
import TableHead from './TableHead'

export default {
	title: 'Components/Table/Molecules/TableHead',
	component: TableHead
} as ComponentMeta<typeof TableHead>

const component: ComponentStory<typeof TableHead> = (args) => (
	<article>
		<table style={{ width: '100%' }} cellSpacing={0}>
			<TableHead {...args} />
		</table>
	</article>
)
export const tableHead = component.bind({})
const handleCheck = (check: boolean) => console.log({ check })
tableHead.args = {
	showChecks: { show: true, handleCheck },
	checkHead: { check: true, indeterminate: false },
	columns: [
		{ name: 'name', sortable: true },
		{ name: 'lastname', sortable: true },
		{ name: 'age', sortable: true },
		{ name: 'phone', sortable: true }
	]
}
