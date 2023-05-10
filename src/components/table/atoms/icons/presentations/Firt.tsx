import { IconProps } from '../domain/models/IconProps'

const Firt = ({ height, width, color }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			width={width}
			height={height}
			x="0"
			y="0"
			viewBox="0 0 32 32"
		>
			<g transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,31.999997854232788,32.000003814697266)">
				<path
					d="M22 16a1 1 0 0 1-.55.89l-18 9A1 1 0 0 1 3 26a1 1 0 0 1-.53-.15A1 1 0 0 1 2 25V7a1 1 0 0 1 1.45-.89l18 9A1 1 0 0 1 22 16zm7-10h-4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"
					data-name="Layer 36"
					fill={color}
					data-original={color}
				></path>
			</g>
		</svg>
	)
}

export default Firt
