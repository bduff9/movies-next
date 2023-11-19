import { FC, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const CustomError: FC<Props> = ({ children }) => (
	<p className="block text-xs mt-1 text-red-600">{children}</p>
);

export default CustomError;
