import { IconProps } from '../domain/models/IconProps'

const Last = ({ height, width, color }: IconProps) => {
	return (
		<svg height={height} viewBox="0 0 32 32" width={width}>
			<g data-name="Layer 36">
				<path
					d="m22 16a1 1 0 0 1 -.55.89l-18 9a1 1 0 0 1 -.45.11 1 1 0 0 1 -.53-.15 1 1 0 0 1 -.47-.85v-18a1 1 0 0 1 1.45-.89l18 9a1 1 0 0 1 .55.89zm7-10h-4a1 1 0 0 0 -1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-18a1 1 0 0 0 -1-1z"
					fill={color}
				/>
			</g>
		</svg>
	)
}

export default Last
