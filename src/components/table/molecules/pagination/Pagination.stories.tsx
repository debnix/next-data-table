import { ComponentMeta, ComponentStory } from '@storybook/react'
import { actions, action } from '@storybook/addon-actions'
import Pagination from './Pagination'

export default {
	title: 'Components/Molecules/Pagination',
	Component: Pagination
} as ComponentMeta<typeof Pagination>

const component: ComponentStory<typeof Pagination> = (args) => (
	<Pagination {...args} />
)

export const pagination = component.bind({})
pagination.args = {
	handleChangePage: (changePage) => action('handleChange page'),
	handleRowPerPage: (n) => action('------'),
	pageSizeOptions: [10, 15, 20]
}
