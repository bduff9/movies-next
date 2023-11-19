'use client';
import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
	Banknote,
	Book,
	Box,
	Brackets,
	Check,
	ClipboardList,
	Square,
	Truck,
} from 'lucide-react';

import { getFormattedDate } from '@/utils/date';
import type { MovieItem as MovieItemSchema } from '../../drizzle/schema';
import MovieItemPlaceholder from './MovieItemPlaceholder';
import { toggleWatched } from '@/actions/movieItems';
import ToggleWatchedButton from './ToggleWatchedButton';

const getFormatImage = (
	format: MovieItemSchema['itemformat'],
	is3D: MovieItemSchema['item3D']
): string => {
	let image = `/images/${format.replace(/[\s-]/g, '')}`;

	if (is3D === 'Y') image += '3D';

	return `${image}.png`;
};

const getCaseIcon = (caseType: MovieItemSchema['itemcase']): ReactNode => {
	switch (caseType) {
		case 'Box':
			return <Box className="w-4 h-4 text-blue-400" />;
		case 'Digibook':
			return <Book className="w-4 h-4 text-blue-400" />;
		case 'Plain':
			return <Square className="w-4 h-4 text-blue-400" />;
		case 'Slipcover':
			return <Brackets className="w-4 h-4" />;
		case 'Steelbook':
			return <Book className="w-4 h-4 text-gray-500" />;
		default:
			console.error('Invalid case type passed', caseType);

			return <></>;
	}
};

const getStatusIcon = (status: MovieItemSchema['itemstatus']): ReactNode => {
	switch (status) {
		case 'Owned':
			return <Check className="w-4 h-4 text-green-400" />;
		case 'Selling':
			return <Banknote className="w-4 h-4 text-green-600" />;
		case 'Waiting':
			return <Truck className="w-4 h-4" />;
		case 'Wanted':
			return <ClipboardList className="w-4 h-4" />;
		default:
			console.error('Invalid status passed', status);

			return <></>;
	}
};

type Props = {
	item: MovieItemSchema;
};

const MovieItem: FC<Props> = ({ item }) => {
	return (
		<div
			className="border border-gray-300 rounded-lg bg-gray-100 flex flex-col"
			style={{ width: '200px' }}>
			<header className="whitespace-nowrap overflow-hidden overflow-ellipsis border-b border-gray-300 py-3 px-4">
				{item.itemname}
			</header>
			<div className="px-8">
				{item.itemurl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img alt={`Case for ${item.itemname}`} src={item.itemurl} />
				) : (
					<MovieItemPlaceholder title={item.itemname} />
				)}
			</div>
			<div className="p-6 flex-grow">
				<div className="flex">
					<div className="mr-4">
						<Image
							src={getFormatImage(item.itemformat, item.item3D)}
							alt={item.itemformat}
							width={48}
							height={48}
						/>
					</div>
					<div className="flex flex-wrap flex-grow">
						<div className="w-1/2 h-5 text-center text-purple-700 font-bold">
							{item.itemdigitl.includes('UV') && 'UV'}
						</div>
						<div className="w-1/2 h-5 text-center font-bold">
							{item.itemdigitl.includes('DC') && 'DC'}
						</div>
						<div
							className="w-1/2 h-5 flex items-center justify-center"
							title={item.itemcase}>
							{getCaseIcon(item.itemcase)}
						</div>
						<div
							className="w-1/2 h-5 flex items-center justify-center"
							title={item.itemstatus}>
							{getStatusIcon(item.itemstatus)}
						</div>
					</div>
				</div>
				{!!item.itemavail && <small>{getFormattedDate(item.itemavail)}</small>}
			</div>
			<div
				className="flex border-t border-gray-300 flex-shrink"
				style={{ height: '72px' }}>
				<div className="w-1/2 border-r border-gray-300 flex items-center justify-center p-3">
					<Link href={`/item/${item.itemid}`}>Edit</Link>
				</div>
				<div className="w-1/2 flex items-center justify-center p-3">
					<form action={toggleWatched}>
						<ToggleWatchedButton
							isWatched={item.itemwatch === 'Y'}
							id={item.itemid}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default MovieItem;
