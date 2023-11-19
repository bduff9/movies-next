'use client';

import { cn } from '@/lib/utils';
import { getQueryString } from '@/utils/string';
import {
	ArrowDown01,
	ArrowDownAZ,
	ArrowUp10,
	ArrowUpDown,
	ArrowUpZA,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Plus,
	Search,
} from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import Filters from './Filters';
import clsx from 'clsx';

type SortButtonProps = {
	searchParams: Record<string, string | string[] | undefined>;
};

const SortButton: FC<SortButtonProps> = ({ searchParams }) => {
	const { sort, order } = searchParams;
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					type="button"
					className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					aria-expanded="true"
					aria-haspopup="true"
					onClick={() => setMenuOpen((open) => !open)}>
					<ArrowUpDown className="w-5 h-5" />
					<svg
						className="-mr-1 h-5 w-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<div
				className={clsx(
					'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out transform',
					menuOpen
						? 'duration-100 opacity-100 scale-100'
						: 'duration-75 opacity-0 scale-95'
				)}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex={-1}>
				<div className="py-1" role="none">
					<Link
						href={`/${getQueryString(searchParams, {
							sort: 'ordered',
							order: sort === 'ordered' && order === 'desc' ? 'asc' : 'desc',
						})}`}
						className={clsx(
							'block px-4 py-2 text-sm',
							sort === 'ordered' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
						)}
						role="menuitem"
						tabIndex={-1}
						id="menu-item-0">
						Order{' '}
						{sort === 'ordered' ? (
							order === 'asc' ? (
								<ArrowDown01 className="inline w-5 h-5" />
							) : (
								<ArrowUp10 className="inline w-5 h-5" />
							)
						) : null}
					</Link>
					<Link
						href={`/${getQueryString(searchParams, {
							sort: 'itemid',
							order: sort === 'itemid' && order === 'desc' ? 'asc' : 'desc',
						})}`}
						className={clsx(
							'block px-4 py-2 text-sm',
							sort === 'itemid' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
						)}
						role="menuitem"
						tabIndex={-1}
						id="menu-item-0">
						ID{' '}
						{sort === 'itemid' ? (
							order === 'asc' ? (
								<ArrowDown01 className="inline w-5 h-5" />
							) : (
								<ArrowUp10 className="inline w-5 h-5" />
							)
						) : null}
					</Link>
					<Link
						href={`/${getQueryString(searchParams, {
							sort: 'itemname',
							order: sort === 'itemname' && order === 'desc' ? 'asc' : 'desc',
						})}`}
						className={clsx(
							'block px-4 py-2 text-sm',
							sort === 'itemname'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-700'
						)}
						role="menuitem"
						tabIndex={-1}
						id="menu-item-0">
						Title{' '}
						{sort === 'itemname' ? (
							order === 'asc' ? (
								<ArrowDownAZ className="inline w-5 h-5" />
							) : (
								<ArrowUpZA className="inline w-5 h-5" />
							)
						) : null}
					</Link>
				</div>
			</div>
		</div>
	);
};

type Props = {
	maxPage: number;
	page: number;
	searchParams: Record<string, string | string[] | undefined>;
};

const Toolbar: FC<Props> = ({ maxPage, page, searchParams }) => {
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const firstQs = getQueryString(searchParams, { page: '1' });
	const prevQs = getQueryString(searchParams, { page: `${page - 1}` });
	const nextQs = getQueryString(searchParams, { page: `${page + 1}` });
	const lastQs = getQueryString(searchParams, { page: `${maxPage}` });

	return (
		<div className="mx-6 mt-3">
			<div className="flex items-center">
				<select className="mr-12 border border-gray-300 rounded p-2">
					<option value="">-- Select a Saved View --</option>
				</select>
				<Link
					className={cn({ 'pointer-events-none': page === 1 })}
					href={`/${firstQs}`}>
					<ChevronsLeft
						className={cn('w-7 h-7', {
							'cursor-pointer': page > 1,
							'text-gray-400': page === 1,
						})}
					/>
				</Link>
				<Link
					className={cn({ 'pointer-events-none': page === 1 })}
					href={`/${prevQs}`}>
					<ChevronLeft
						className={cn('w-7 h-7', {
							'cursor-pointer': page > 1,
							'text-gray-400': page === 1,
						})}
					/>
				</Link>
				<form>
					<input
						className="border border-gray-300 rounded"
						defaultValue={page}
						name="page"
						type="number"
					/>
					{Object.keys(searchParams).map((key) => {
						if (key === 'page') return null;

						return (
							<input
								type="hidden"
								name={key}
								value={searchParams[key]}
								key={key}
							/>
						);
					})}
					<button type="submit" className="hidden">
						Go
					</button>
				</form>
				<Link
					className={cn({ 'pointer-events-none': page === maxPage })}
					href={`/${nextQs}`}>
					<ChevronRight
						className={cn('w-7 h-7', {
							'cursor-pointer': page < maxPage,
							'text-gray-400': page === maxPage,
						})}
					/>
				</Link>
				<Link
					className={cn({ 'pointer-events-none': page === maxPage })}
					href={`/${lastQs}`}>
					<ChevronsRight
						className={cn('w-7 h-7 mr-12', {
							'cursor-pointer': page < maxPage,
							'text-gray-400': page === maxPage,
						})}
					/>
				</Link>
				<Link href="/item/add">
					<Plus className="w-7 h-7 mr-12" />
				</Link>
				<div>
					<Search
						className="w-7 h-7 mr-12"
						onClick={() => setFilterOpen((open) => !open)}
					/>
				</div>
				<SortButton searchParams={searchParams} />
			</div>
			<Filters filterOpen={filterOpen} searchParams={searchParams} />
		</div>
	);
};

export default Toolbar;
