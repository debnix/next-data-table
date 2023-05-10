import { ComponentMeta, ComponentStory } from '@storybook/react'
import Checkbox from './Checkbox'

export default {
	title: 'Components/Atoms/Checkbox',
	component: Checkbox
} as ComponentMeta<typeof Checkbox>

const component: ComponentStory<typeof Checkbox> = (args) => (
	<Checkbox {...args} />
)
export const checkbox = component.bind({})
checkbox.args = {
	value: true,
	indeterminate: false,
	onChange: (event) => console.log(event)
}
