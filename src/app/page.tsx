import { db } from '@/lib/db';
import { NP } from '@/lib/types';
import { movitems } from '../../drizzle/schema';
import { SQL, and, asc, desc, eq, like, sql } from 'drizzle-orm';
import Toolbar from '@/components/Toolbar';
import MovieItem from '@/components/MovieItem';

const getData = async (searchParams: {
	[key: string]: string | string[] | undefined;
}) => {
	const ITEMS_PER_PAGE = 25;
	const sortDir = searchParams.order === 'asc' ? asc : desc;
	const where: SQL[] = [];

	if (searchParams.itemname) {
		where.push(like(movitems.itemname, `%${searchParams.itemname}%`));
	}

	if (searchParams.itemcase) {
		where.push(eq(movitems.itemcase, searchParams.itemcase as any));
	}

	if (searchParams.itemdigitl) {
		where.push(eq(movitems.itemdigitl, searchParams.itemdigitl as any));
	}

	if (searchParams.itemformat) {
		where.push(eq(movitems.itemformat, searchParams.itemformat as any));
	}

	if (searchParams.item3D) {
		where.push(eq(movitems.item3D, searchParams.item3D as any));
	}

	if (searchParams.itemwatch) {
		where.push(eq(movitems.itemwatch, searchParams.itemwatch as any));
	}

	if (searchParams.itemstatus) {
		where.push(eq(movitems.itemstatus, searchParams.itemstatus as any));
	}

	let orderBy = sortDir(movitems.itemid);

	if (searchParams.sort === 'ordered') {
		orderBy = sortDir(movitems.ordered);
	} else if (searchParams.sort === 'itemname') {
		orderBy = sortDir(movitems.itemname);
	}

	const total = await db
		.select({ count: sql<number>`count(*)` })
		.from(movitems)
		.where(and(...where));
	const maxPage = Math.ceil(total[0].count / ITEMS_PER_PAGE);
	let page = searchParams.page ? Number(searchParams.page) : 1;

	if (page < 1) {
		page = 1;
	} else if (page > maxPage) {
		page = maxPage;
	}

	const movieItems = await db
		.select()
		.from(movitems)
		.where(and(...where))
		.orderBy(orderBy)
		.limit(ITEMS_PER_PAGE)
		.offset((page - 1) * ITEMS_PER_PAGE);

	return {
		maxPage,
		movieItems,
		page,
	};
};

const HomePage: NP = async ({ searchParams }) => {
	const { maxPage, movieItems, page } = await getData(searchParams);

	return (
		<main className="min-h-screen max-w-screen">
			<Toolbar maxPage={maxPage} page={page} searchParams={searchParams} />
			<div className="flex flex-wrap gap-3 justify-center pt-3">
				{movieItems.length === 0 && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-400">
						No movies found
					</div>
				)}
				{movieItems.map((item) => (
					<MovieItem item={item} key={`movie-item-${item.itemid}`} />
				))}
			</div>
		</main>
	);
};

export default HomePage;
