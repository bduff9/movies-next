'use server';

import { db } from '@/lib/db';
import 'server-only';
import { movies } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/utils/auth';

export const deleteMovie = async (formData: FormData) => {
	await requireAdmin();

	const schema = z.coerce.number();
	const id = schema.parse(formData.get('movieid'));
	const itemId = schema.parse(formData.get('itemid'));

	await db.delete(movies).where(eq(movies.movieid, id));
	revalidatePath(`/item/${itemId}`);
};

export const addMovie = async (formData: FormData) => {
	await requireAdmin();

	const schema = z.object({
		itemid: z.coerce.number(),
		movietitle: z.string(),
		movieurl: z.string().url(),
	});
	const movie = schema.parse({
		itemid: formData.get('itemid'),
		movietitle: formData.get('movietitle'),
		movieurl: formData.get('movieurl'),
	});

	await db.insert(movies).values(movie);
	revalidatePath(`/item/${movie.itemid}`);
};
