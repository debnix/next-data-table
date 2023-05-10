import { ComponentMeta, ComponentStory } from '@storybook/react'
import { IconFactory } from './domain/use-cases/factoryIcon'
import { Icon } from './domain/models/Icon'

export default {
	title: 'Components/Atoms/IconFactory',
	component: IconFactory
} as ComponentMeta<typeof IconFactory>

const component: ComponentStory<typeof IconFactory> = (args: Icon) => (
	<IconFactory {...args} />
)
export const iconFactory = component.bind({})
iconFactory.args = {
	color: '#000000',
	height: 50,
	width: 50,
	name: 'Next'
}
