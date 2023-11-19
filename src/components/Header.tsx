import { UserButton } from '@clerk/nextjs';
import { FC } from 'react';

type Props = {};

const Header: FC<Props> = (props) => {
	return (
		<div className="w-full h-12 flex justify-between items-center px-4 bg-gradient-to-b from-blue-400 to-blue-600">
			<h1 className="text-white font-semibold">Movie Tracker</h1>
			<UserButton />
		</div>
	);
};

export default Header;
