import { ComponentMeta, ComponentStory } from '@storybook/react'
import SelectPagination from './SelectPagination'

export default {
	title: 'Components/Molecules/SelectPagination',
	component: SelectPagination
} as ComponentMeta<typeof SelectPagination>

const component: ComponentStory<typeof SelectPagination> = (args) => (
	<SelectPagination {...args} />
)

export const selectPagination = component.bind({})
selectPagination.args = {
	pageSizeOptions: [5, 10, 15],
	callbackSelect: (rowsPerPage: number) => console.log({ rowsPerPage })
}
