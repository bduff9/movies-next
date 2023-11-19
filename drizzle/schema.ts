import {
	mysqlTable,
	index,
	unique,
	int,
	varchar,
	text,
	mysqlEnum,
	date,
	timestamp,
} from 'drizzle-orm/mysql-core';

export const movies = mysqlTable(
	'movies',
	{
		movieid: int('MOVIEID').autoincrement().notNull(),
		itemid: int('ITEMID').references(() => movitems.itemid, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		movietitle: varchar('MOVIETITLE', { length: 99 }).default('NULL'),
		movieurl: varchar('MOVIEURL', { length: 99 }).default('NULL'),
	},
	(table) => {
		return {
			itemid: index('ITEMID').on(table.itemid),
			movietitle: index('MOVIETITLE').on(table.movietitle),
			movieurl: index('MOVIEURL').on(table.movieurl),
		};
	}
);

export type Movie = typeof movies.$inferSelect;

export const movitems = mysqlTable(
	'movitems',
	{
		itemid: int('ITEMID').autoincrement().notNull(),
		ordered: int('ORDERED'),
		itemname: varchar('ITEMNAME', { length: 99 }).notNull(),
		itemcase: mysqlEnum('ITEMCASE', [
			'Plain',
			'Box',
			'Slipcover',
			'Digibook',
			'Steelbook',
		]).notNull(),
		itemdigitl: mysqlEnum('ITEMDIGITL', ['None', 'DC', 'UV', 'DC+UV'])
			.default('None')
			.notNull(),
		item3D: mysqlEnum('ITEM3D', ['Y', 'N']).default('N').notNull(),
		itemwatch: mysqlEnum('ITEMWATCH', ['Y', 'N']).default('N').notNull(),
		itemformat: mysqlEnum('ITEMFORMAT', [
			'Blu-ray',
			'DVD',
			'Ultra HD',
			'UV',
			'Digital',
		]).notNull(),
		itemstatus: mysqlEnum('ITEMSTATUS', [
			'Owned',
			'Wanted',
			'Selling',
			'Waiting',
		]).notNull(),
		// you can use { mode: 'date' }, if you want to have Date as type for this column
		itemavail: date('ITEMAVAIL', { mode: 'date' }),
		itemurl: varchar('ITEMURL', { length: 99 }).notNull(),
		itemnotes: text('ITEMNOTES').default('NULL'),
	},
	(table) => {
		return {
			itemname: index('ITEMNAME').on(table.itemname),
			itemcase: index('ITEMCASE').on(table.itemcase),
			itemdigitl: index('ITEMDIGITL').on(table.itemdigitl),
			item3D: index('ITEM3D').on(table.item3D),
			itemwatch: index('ITEMWATCH').on(table.itemwatch),
			itemformat: index('ITEMFORMAT').on(table.itemformat),
			itemstatus: index('ITEMSTATUS').on(table.itemstatus),
			itemavail: index('ITEMAVAIL').on(table.itemavail),
			itemurl: index('ITEMURL').on(table.itemurl),
			ordered: unique('ORDERED').on(table.ordered),
			idxFd702E539Ab7B35Cd2338Fb3E3: unique(
				'IDX_fd702e539ab7b35cd2338fb3e3'
			).on(table.ordered),
		};
	}
);

export type MovieItem = typeof movitems.$inferSelect;

export const users = mysqlTable(
	'users',
	{
		id: int('id').autoincrement().notNull(),
		name: varchar('name', { length: 255 }).default('NULL'),
		email: varchar('email', { length: 255 }).default('NULL'),
		emailVerified: timestamp('email_verified', { fsp: 6, mode: 'string' })
			.default('current_timestamp(6)')
			.notNull(),
		image: varchar('image', { length: 255 }).default('NULL'),
		createdAt: timestamp('created_at', { fsp: 6, mode: 'string' })
			.default('current_timestamp(6)')
			.notNull(),
		updatedAt: timestamp('updated_at', { fsp: 6, mode: 'string' })
			.default('current_timestamp(6)')
			.notNull(),
	},
	(table) => {
		return {
			ukEmail: unique('uk_email').on(table.email),
		};
	}
);
