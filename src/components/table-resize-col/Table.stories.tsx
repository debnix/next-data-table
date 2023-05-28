import { ComponentMeta, ComponentStory } from '@storybook/react'
import Table from './Table'
import TableContent from './TableContent'

export default {
	title: 'Components/TableResize',
	component: Table
} as ComponentMeta<typeof Table>

const component: ComponentStory<typeof Table> = (args) => <Table {...args} />
export const tableReisze = component.bind({})
const tableHeaders = ['Items', 'Order #', 'Amount', 'Status', 'Driver']
tableReisze.args = {
	headers: tableHeaders,
	minCellWidth: 14,
	tableContent: <TableContent />
}
