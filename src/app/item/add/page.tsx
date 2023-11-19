import { addMovieItem } from '@/actions/movieItems';
import MovieItemForm from '@/components/MovieItemForm';
import { NP } from '@/lib/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Add Movie Item',
};

const AddPage: NP = async () => {
	return (
		<div className="mx-auto my-0 relative max-w-none px-8 w-full">
			<div className="flex items-center justify-center">
				<div className="flex-1 p-3">
					<MovieItemForm onSubmit={addMovieItem} />
				</div>
			</div>
		</div>
	);
};

export default AddPage;
