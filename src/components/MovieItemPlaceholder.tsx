import { FC } from 'react';

type Props = {
	title: string;
};

const MovieItemPlaceholder: FC<Props> = ({ title }) => {
	if (title.length > 10) title = title.substring(0, 10);

	return (
		<svg
			width="114"
			height="152"
			xmlns="http://www.w3.org/2000/svg"
			className="mx-auto">
			<rect
				x="2"
				y="2"
				width="110"
				height="148"
				style={{ fill: '#dedede', stroke: '#dedede', strokeWidth: 2 }}
			/>
			<text
				x="50%"
				y="50%"
				fontSize="18"
				textAnchor="middle"
				alignmentBaseline="middle"
				fontFamily="monospace, sans-serif"
				fill="#999">
				{title}
			</text>
		</svg>
	);
};

export default MovieItemPlaceholder;
