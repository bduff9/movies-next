'use client';

import { FC } from 'react';

import MovieItemPlaceholder from './MovieItemPlaceholder';
import { MovieItem } from '../../drizzle/schema';
import { useFormState } from 'react-dom';
import MovieItemFormButtons from './MovieItemFormButtons';
import CustomError from './CustomError';

type Props = {
	movieItem?: MovieItem;
	onSubmit: (prevState: any, formData: FormData) => Promise<any>;
};

const MovieItemForm: FC<Props> = ({
	movieItem = {
		itemavail: null,
		itemcase: 'Plain',
		itemdigitl: 'None',
		itemformat: 'Ultra HD',
		item3D: 'N',
		itemwatch: 'N',
		itemid: 0,
		itemname: '',
		itemnotes: null,
		itemstatus: 'Owned',
		itemurl: '',
	},
	onSubmit,
}) => {
	const [state, formAction] = useFormState(onSubmit, {});

	return (
		<form action={formAction}>
			<MovieItemFormButtons showError state={state} />
			<input id="itemid" name="itemid" type="hidden" value={movieItem.itemid} />

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemname">
					Title
				</label>
				<div className="box-border clear-both text-base relative">
					<input
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemname}
						id="itemname"
						name="itemname"
						type="text"
						placeholder="Title"
					/>
				</div>
				{state.itemname && (
					<CustomError>{state.itemname._errors[0]}</CustomError>
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemformat">
					Format
				</label>
				<div className="box-border clear-both text-base relative">
					<select
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemformat}
						id="itemformat"
						name="itemformat">
						<option value="Blu-ray">Blu-ray</option>
						<option value="DVD">DVD</option>
						<option value="Ultra HD">Ultra HD</option>
						<option value="UV">UV</option>
						<option value="Digital">Digital</option>
					</select>
				</div>
				{state.itemformat && (
					<CustomError>{state.itemformat._errors[0]}</CustomError>
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="item3D-Y">
					3D?
				</label>
				<div className="box-border clear-both text-base relative">
					<label className="mr-6">
						<input
							defaultChecked={movieItem.item3D === 'Y'}
							id="item3D-Y"
							name="item3D"
							type="radio"
							value="Y"
						/>{' '}
						Yes
					</label>
					<label>
						<input
							defaultChecked={movieItem.item3D === 'N'}
							id="item3D-N"
							name="item3D"
							type="radio"
							value="N"
						/>{' '}
						No
					</label>
				</div>
				{state.item3D && <CustomError>{state.item3D._errors[0]}</CustomError>}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemdigitl">
					Digital Type
				</label>
				<div className="box-border clear-both text-base relative">
					<select
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemdigitl}
						id="itemdigitl"
						name="itemdigitl">
						<option value="None">None</option>
						<option value="DC">Digital Copy</option>
						<option value="UV">Ultraviolet</option>
						<option value="DC+UV">Digital Copy + Ultraviolet</option>
					</select>
				</div>
				{state.itemdigitl && (
					<CustomError>{state.itemdigitl._errors[0]}</CustomError>
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemcase">
					Case Type
				</label>
				<div className="box-border clear-both text-base relative">
					<select
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemcase}
						id="itemcase"
						name="itemcase">
						<option value="Plain">Plain</option>
						<option value="Box">Box</option>
						<option value="Digibook">Digibook</option>
						<option value="Slipcover">Slipcover</option>
						<option value="Steelbook">Steelbook</option>
					</select>
				</div>
				{state.itemcase && (
					<CustomError>{state.itemcase._errors[0]}</CustomError>
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemstatus">
					Status
				</label>
				<div className="box-border clear-both text-base relative">
					<select
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemstatus}
						id="itemstatus"
						name="itemstatus">
						<option value="Owned">Owned</option>
						<option value="Wanted">Wanted</option>
						<option value="Selling">Selling</option>
						<option value="Waiting">Waiting</option>
					</select>
				</div>
				{state.itemstatus && (
					<CustomError>{state.itemstatus._errors[0]}</CustomError>
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemavail">
					Release Date
				</label>
				<div className="box-border clear-both text-base relative">
					<input
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemavail?.toISOString().split('T')[0]}
						id="itemavail"
						name="itemavail"
						type="date"
						placeholder="Release Date"
					/>
				</div>
				{state.itemavail && (
					<CustomError>{state.itemavail._errors[0]}</CustomError>
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemwatch-Y">
					Watched?
				</label>
				<div className="box-border clear-both text-base relative">
					<label className="mr-6">
						<input
							defaultChecked={movieItem.itemwatch === 'Y'}
							id="itemwatch-Y"
							name="itemwatch"
							type="radio"
							value="Y"
						/>{' '}
						Yes
					</label>
					<label>
						<input
							defaultChecked={movieItem.itemwatch === 'N'}
							id="itemwatch-N"
							name="itemwatch"
							type="radio"
							value="N"
						/>{' '}
						No
					</label>
				</div>
				{state.itemwatch && (
					<CustomError>{state.itemwatch._errors[0]}</CustomError>
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemurl">
					Image
				</label>
				<div className="box-border clear-both text-base relative">
					<input
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemurl}
						id="itemurl"
						name="itemurl"
						type="text"
						placeholder="Image"
					/>
				</div>
				{state.itemurl && <CustomError>{state.itemurl._errors[0]}</CustomError>}
			</div>

			<div style={{ width: '114px' }}>
				{movieItem.itemurl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img alt={`Case for ${movieItem.itemname}`} src={movieItem.itemurl} />
				) : (
					<MovieItemPlaceholder title={movieItem.itemname ?? ''} />
				)}
			</div>

			<div className="mb-3">
				<label className="block mb-2 text-base font-bold" htmlFor="itemnotes">
					Notes
				</label>
				<div className="box-border clear-both text-base relative">
					<textarea
						className="w-full bg-white border border-gray-300 rounded py-2 px-3"
						defaultValue={movieItem.itemnotes ?? undefined}
						id="itemnotes"
						name="itemnotes"
					/>
				</div>
				{state.itemnotes && (
					<CustomError>{state.itemnotes._errors[0]}</CustomError>
				)}
			</div>

			<MovieItemFormButtons state={state} />
		</form>
	);
};

export default MovieItemForm;
