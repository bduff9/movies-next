'use client';

import { FC } from 'react';
import { useFormStatus } from 'react-dom';
import CustomError from './CustomError';

type Props = {
	showError?: boolean;
	state: Record<string, FormDataEntryValue>;
};

const MovieItemFormButtons: FC<Props> = ({ showError = false, state }) => {
	const { pending } = useFormStatus();

	return (
		<div className="flex-1 p-3">
			<a
				className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				href="/">
				Return
			</a>
			&nbsp;
			<button
				className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
				disabled={pending}
				type="reset">
				Reset
			</button>
			&nbsp;
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				disabled={pending}
				type="submit">
				Save
			</button>
			{showError && Object.keys(state).length > 0 && (
				<CustomError>
					Please fix the {Object.keys(state).length} errors below
				</CustomError>
			)}
		</div>
	);
};

export default MovieItemFormButtons;
