import 'server-only';

import { z } from 'zod';

import { NP } from '@/lib/types';
import { db } from '@/lib/db';
import { movitems } from '../../../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { editMovieItem } from '@/actions/movieItems';
import MovieItemForm from '@/components/MovieItemForm';
import MovieItemMoviesContainer from '@/components/MovieItemMoviesContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Edit Movie Item',
};

const getMovieItem = async (itemId: number) => {
	const [item] = await db
		.select()
		.from(movitems)
		.where(eq(movitems.itemid, itemId));

	if (!item) {
		throw new Error('Error loading movie item to edit');
	}

	return item;
};

const EditPage: NP = async ({ params: { itemId } }) => {
	const schema = z.coerce.number();
	const id = schema.parse(itemId);
	const movieItem = await getMovieItem(id);

	return (
		<div className="mx-auto my-0 relative max-w-none px-8 w-full">
			<div className="flex items-center justify-center">
				<div className="flex-1 p-3">
					<MovieItemForm movieItem={movieItem} onSubmit={editMovieItem} />
					<MovieItemMoviesContainer movieItemID={movieItem.itemid} />
				</div>
			</div>
		</div>
	);
};

export default EditPage;
