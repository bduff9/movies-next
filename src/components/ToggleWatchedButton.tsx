'use client';

import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
	id: number;
	isWatched: boolean;
};

const ToggleWatchedButton: FC<Props> = ({ id, isWatched }) => {
	const { pending } = useFormStatus();

	if (pending) {
		return <Loader2 className="animate-spin" />;
	}

	return (
		<>
			{!isWatched ? (
				<button name="id" value={id} type="submit">
					Mark Watched
				</button>
			) : (
				<button className="text-green-600" name="id" value={id} type="submit">
					Watched
				</button>
			)}
		</>
	);
};

export default ToggleWatchedButton;
