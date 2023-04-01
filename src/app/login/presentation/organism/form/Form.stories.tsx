import { ComponentMeta, ComponentStory } from '@storybook/react'
import Form from './Form'

export default {
	title: 'App/Login/Form',
	component: Form
} as ComponentMeta<typeof Form>

const component: ComponentStory<typeof Form> = (args) => <Form />
export const form = component.bind({})
