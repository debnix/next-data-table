import { Icon } from '../models/Icon'
import { iconsImport } from './iconsImport'

export const IconFactory = ({
	height,
	width,
	color,
	name
}: Icon): JSX.Element => {
	const IconComponent = iconsImport[name]
	return <IconComponent height={height} width={width} color={color} />
}
