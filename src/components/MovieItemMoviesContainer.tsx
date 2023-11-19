import { db } from '@/lib/db';
import { FC } from 'react';
import { Movie, movies } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import MovieItemPlaceholder from './MovieItemPlaceholder';
import { Trash2 } from 'lucide-react';
import { addMovie, deleteMovie } from '@/actions/movies';

const getMoviesForItem = async (itemId: number): Promise<Movie[]> => {
	const moviesResult = await db
		.select()
		.from(movies)
		.where(eq(movies.itemid, itemId));

	return moviesResult;
};

type Props = {
	movieItemID: number;
};

const MovieItemMoviesContainer: FC<Props> = async ({ movieItemID }) => {
	const movies = await getMoviesForItem(movieItemID);

	return (
		<div className="flex-1 p-3">
			<p className="block uppercase mb-1">Movies</p>
			{movies.length ? (
				<div className="flex gap-2 mb-3">
					{movies.map((movie) => (
						<div
							className="text-center"
							key={`movie-${movie.movieid}`}
							style={{ width: '114px' }}>
							{movie.movietitle}
							<div>
								{movie.movieurl ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										alt={`Case for ${movie.movietitle}`}
										src={movie.movieurl}
									/>
								) : (
									<MovieItemPlaceholder title={movie.movietitle ?? ''} />
								)}
							</div>
							<form action={deleteMovie}>
								<input type="hidden" name="itemid" value={movieItemID} />
								<button name="movieid" value={movie.movieid} type="submit">
									<Trash2 className="w-5 h-5 text-red-600" />
								</button>
							</form>
						</div>
					))}
				</div>
			) : (
				<small>No movies found</small>
			)}
			<form action={addMovie}>
				<input type="hidden" name="itemid" value={movieItemID} />
				<div className="mb-3">
					<label
						className="block mb-2 text-base font-bold"
						htmlFor="movietitle">
						Title
					</label>
					<div className="box-border clear-both text-base relative">
						<input
							className="w-full bg-white border border-gray-300 rounded py-2 px-3"
							id="movietitle"
							name="movietitle"
							type="text"
							placeholder="Title"
							required
						/>
					</div>
				</div>
				<div className="mb-3">
					<label className="block mb-2 text-base font-bold" htmlFor="movieurl">
						Image
					</label>
					<div className="box-border clear-both text-base relative">
						<input
							className="w-full bg-white border border-gray-300 rounded py-2 px-3"
							id="movieurl"
							name="movieurl"
							type="text"
							placeholder="Image"
							required
						/>
					</div>
				</div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit">
					Add Movie
				</button>
			</form>
		</div>
	);
};

export default MovieItemMoviesContainer;
