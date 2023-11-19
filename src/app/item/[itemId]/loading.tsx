import MovieItemFormButtons from '@/components/MovieItemFormButtons';
import { NP } from '@/lib/types';
import Skeleton from 'react-loading-skeleton';

const loading: NP = () => {
	return (
		<div className="mx-auto my-0 relative max-w-none px-8 w-full">
			<div className="flex items-center justify-center">
				<div className="flex-1 p-3">
					<MovieItemFormButtons showError state={{}} />

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Title</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Format</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">3D?</label>
						<div className="box-border clear-both text-base relative">
							<label className="mr-6 w-11 inline-block">
								<Skeleton />
							</label>
							<label className="w-11 inline-block">
								<Skeleton />
							</label>
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Format</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Case Type</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Status</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">
							Release Date
						</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Watched?</label>
						<div className="box-border clear-both text-base relative">
							<label className="mr-6 w-11 inline-block">
								<Skeleton />
							</label>
							<label className="w-11 inline-block">
								<Skeleton />
							</label>
						</div>
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Image</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<div style={{ height: '138px', width: '114px' }}>
						<Skeleton className="w-full h-full" />
					</div>

					<div className="mb-3">
						<label className="block mb-2 text-base font-bold">Notes</label>
						<div className="box-border clear-both text-base relative">
							<Skeleton className="w-full border border-gray-300 rounded py-2 px-3" />
						</div>
					</div>

					<MovieItemFormButtons state={{}} />
				</div>
			</div>
		</div>
	);
};

export default loading;
