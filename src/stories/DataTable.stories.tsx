import Table from '@/components/table/organism/Table'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
	title: 'Example',
	component: Table
} as ComponentMeta<typeof Table>

const component: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const example = component.bind({})
example.args = {
	showChecks: true,
	pagination: true,
	pageSizeOptions: [10, 20, 30],
	paginationMode: { server: true, totalRows: 26 },
	handleCheck: (checks: string[]) => {
		console.log(checks)
	},
	columns: [
		{ name: 'firstname', sortable: true },
		{ name: 'lastname', sortable: true },
		{ name: 'age', sortable: true }
	],
	rows: [
		{ id: '1', columns: ['Andres', 'Quintero', '10'], checked: true },
		{ id: '2', columns: ['Dario', 'Quintero', '20'] },
		{ id: '3', columns: ['Alex', 'Quintero', '30'] },
		{ id: '4', columns: ['Alex', 'Quintero', '40'] },
		{ id: '5', columns: ['Alex', 'Quintero', '50'] }
		/*{ id: '6', columns: ['Alex', 'Quintero', '60'] },
		{ id: '7', columns: ['Alex', 'Quintero', '70'] },
		{ id: '8', columns: ['Alex', 'Quintero', '80'] },
		{ id: '9', columns: ['Alex', 'Quintero', '90'] },
		{ id: '10', columns: ['Alex', 'Quintero', '100'] }
		{ id: '11', columns: ['Alex', 'Quintero', '110'] },
		{ id: '12', columns: ['Alex', 'Quintero', '120'] },
		{ id: '13', columns: ['Alex', 'Quintero', '130'] },
		{ id: '14', columns: ['Alex', 'Quintero', '140'] },
		{ id: '15', columns: ['Alex', 'Quintero', '150'] },
		{ id: '16', columns: ['Alex', 'Quintero', '160'] },
		{ id: '17', columns: ['Alex', 'Quintero', '170'] },
		{ id: '18', columns: ['Alex', 'Quintero', '180'] },
		{ id: '19', columns: ['Alex', 'Quintero', '190'] },
		{ id: '20', columns: ['Alex', 'Quintero', '200'] },
		{ id: '21', columns: ['Alex', 'Quintero', '210'] },
		{ id: '22', columns: ['Alex', 'Quintero', '220'] },
		{ id: '23', columns: ['Alex', 'Quintero', '230'] },
		{ id: '24', columns: ['Alex', 'Quintero', '240'] },
		{ id: '25', columns: ['Alex', 'Quintero', '250'] },
		{ id: '26', columns: ['Alex', 'Quintero', '260'] } */
	]
}
