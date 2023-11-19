'use server';

import { db } from '@/lib/db';
import 'server-only';

import { z, ZodError } from 'zod';
import { MovieItem, movitems } from '../../drizzle/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/utils/auth';

const validateMovieItem = (item: unknown): item is MovieItem => {
	const schema = z.object({
		item3D: z.enum(['Y', 'N'], {
			invalid_type_error: 'Is 3D should be Y or N',
		}),
		itemavail: z.coerce
			.date({ invalid_type_error: 'Please enter a valid release date' })
			.optional()
			.refine((val) => {
				if (!val) return false;

				val.setMinutes(val.getMinutes() + val.getTimezoneOffset());

				return val.getDay() === 2;
			}, 'Please enter a valid release date'),
		itemcase: z.enum(['Plain', 'Box', 'Digibook', 'Slipcover', 'Steelbook'], {
			invalid_type_error: 'Please enter a valid case type',
		}),
		itemdigitl: z.enum(['None', 'DC', 'UV', 'DC+UV'], {
			invalid_type_error: 'Please enter a valid digital type',
		}),
		itemformat: z.enum(['Blu-ray', 'DVD', 'Ultra HD', 'UV', 'Digital'], {
			invalid_type_error: 'Please enter a valid format',
		}),
		itemid: z.coerce.number().gte(0, 'Please enter a valid ID'),
		itemname: z
			.string({ required_error: 'Please enter a title' })
			.min(1, 'Please enter a title'),
		itemnotes: z.string().optional(),
		itemstatus: z.enum(['Owned', 'Wanted', 'Selling', 'Waiting'], {
			invalid_type_error: 'Please enter a valid status',
		}),
		itemurl: z
			.string({ required_error: 'Please enter a valid image URL' })
			.url('Please enter a valid image URL'),
		itemwatch: z.enum(['Y', 'N'], {
			invalid_type_error: 'Is Watched should be Y or N',
		}),
	});

	schema.parse(item);

	return true;
};

export const addMovieItem = async (_prevState: any, formData: FormData) => {
	await requireAdmin();

	const item = {
		item3D: formData.get('item3D'),
		itemavail: formData.get('itemavail'),
		itemcase: formData.get('itemcase'),
		itemdigitl: formData.get('itemdigitl'),
		itemformat: formData.get('itemformat'),
		itemid: formData.get('itemid'),
		itemname: formData.get('itemname'),
		itemnotes: formData.get('itemnotes'),
		itemstatus: formData.get('itemstatus'),
		itemurl: formData.get('itemurl'),
		itemwatch: formData.get('itemwatch'),
	};

	try {
		if (!validateMovieItem(item)) {
			throw new Error('Item parsing passed but somehow returned false?');
		}
	} catch (error) {
		if (error instanceof ZodError) {
			return error.format();
		} else {
			return { error: 'Something went wrong creating this item' };
		}
	}

	await db.insert(movitems).values({
		itemcase: item.itemcase,
		itemformat: item.itemformat,
		itemname: item.itemname,
		itemstatus: item.itemstatus,
		itemurl: item.itemurl,
		item3D: item.item3D,
		itemavail: item.itemavail,
		itemdigitl: item.itemdigitl,
		itemnotes: item.itemnotes || null,
		itemwatch: item.itemwatch,
	});

	revalidatePath('/');
	redirect('/');
};

export const editMovieItem = async (_prevState: any, formData: FormData) => {
	await requireAdmin();

	const item = {
		item3D: formData.get('item3D'),
		itemavail: formData.get('itemavail'),
		itemcase: formData.get('itemcase'),
		itemdigitl: formData.get('itemdigitl'),
		itemformat: formData.get('itemformat'),
		itemid: formData.get('itemid'),
		itemname: formData.get('itemname'),
		itemnotes: formData.get('itemnotes'),
		itemstatus: formData.get('itemstatus'),
		itemurl: formData.get('itemurl'),
		itemwatch: formData.get('itemwatch'),
	};

	try {
		if (!validateMovieItem(item)) {
			throw new Error('Item parsing passed but somehow returned false?');
		}
	} catch (error) {
		if (error instanceof ZodError) {
			return error.format();
		} else {
			return { error: 'Something went wrong updating this item' };
		}
	}

	await db
		.update(movitems)
		.set({
			itemcase: item.itemcase,
			itemformat: item.itemformat,
			itemname: item.itemname,
			itemstatus: item.itemstatus,
			itemurl: item.itemurl,
			item3D: item.item3D,
			itemavail: item.itemavail,
			itemdigitl: item.itemdigitl,
			itemnotes: item.itemnotes || null,
			itemwatch: item.itemwatch,
		})
		.where(eq(movitems.itemid, item.itemid));

	revalidatePath('/');
	redirect('/');
};

export const toggleWatched = async (formData: FormData): Promise<void> => {
	await requireAdmin();

	const schema = z.coerce.number();
	const id = schema.parse(formData.get('id'));
	const [item] = await db
		.select({
			itemwatch: movitems.itemwatch,
		})
		.from(movitems)
		.where(eq(movitems.itemid, id));
	let ordered: null | number = null;

	if (item.itemwatch === 'Y') {
		const [result] = await db
			.select({ max: sql<number>`max(ordered)` })
			.from(movitems);

		ordered = result.max + 1;
	}

	await db
		.update(movitems)
		.set({ itemwatch: item.itemwatch === 'Y' ? 'N' : 'Y', ordered })
		.where(eq(movitems.itemid, id));
	revalidatePath('/');
};
