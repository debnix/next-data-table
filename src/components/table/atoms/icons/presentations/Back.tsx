import { IconProps } from '../domain/models/IconProps'

const Back = ({ height, width, color }: IconProps) => {
	return (
		<svg
			version="1.1"
			width={width}
			height={height}
			x="0"
			y="0"
			viewBox="0 0 46.02 46.02"
		>
			<g transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,46.01999092102051,46.053944863379)">
				<path
					d="M14.757 46.02a5.688 5.688 0 0 1-3.929-1.569 5.705 5.705 0 0 1-.204-8.063L23.382 22.97 10.637 9.645a5.703 5.703 0 0 1 8.242-7.884l16.505 17.253a5.707 5.707 0 0 1 .013 7.872L18.893 44.247a5.699 5.699 0 0 1-4.136 1.773z"
					fill={color}
					data-original={color}
				></path>
			</g>
		</svg>
	)
}

export default Back
