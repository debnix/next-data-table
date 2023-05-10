import { ComponentMeta, ComponentStory } from '@storybook/react'
import { IconFactory } from './domain/use-cases/factoryIcon'
import { iconsImport } from './domain/use-cases/iconsImport'
import { Fragment } from 'react'

export default {
	title: 'Components/Atoms/Icons',
	component: IconFactory
} as ComponentMeta<typeof IconFactory>

export const icons: ComponentStory<typeof IconFactory> = (args) => (
	<>
		{Object.entries(iconsImport).map((icon, index) => (
			<Fragment key={`${index}`}>
				{icon[1]({
					height: 50,
					width: 50,
					color: '#000000'
				})}
			</Fragment>
		))}
	</>
)
