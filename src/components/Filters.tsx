'use client';

import { FC } from 'react';

type Props = {
	filterOpen: boolean;
	searchParams: Record<string, string | string[] | undefined>;
};

const Filters: FC<Props> = ({ filterOpen, searchParams }) => {
	if (!filterOpen) {
		return null;
	}

	return (
		<div className="border rounded-md border-gray-400 m-4 mb-0 p-4">
			<form>
				<div className="mb-3">
					<label className="block mb-2 text-base font-bold" htmlFor="itemname">
						<b>Title</b> contains
					</label>
					<div className="box-border clear-both text-base relative">
						<input
							className="w-full bg-white border border-gray-300 rounded py-2 px-3"
							defaultValue={searchParams.itemname}
							id="itemname"
							name="itemname"
							type="text"
							placeholder="Title"
						/>
					</div>
				</div>
				<div className="mb-3">
					<label
						className="block mb-2 text-base font-bold"
						htmlFor="itemformat">
						<b>Format</b> is
					</label>
					<div className="box-border clear-both text-base relative">
						<select
							className="w-full bg-white border border-gray-300 rounded py-2 px-3"
							defaultValue={searchParams.itemformat}
							id="itemformat"
							name="itemformat">
							<option value="">-- Select Format --</option>
							<option value="Blu-ray">Blu-ray</option>
							<option value="DVD">DVD</option>
							<option value="Ultra HD">Ultra HD</option>
							<option value="UV">UV</option>
							<option value="Digital">Digital</option>
						</select>
					</div>
				</div>
				<div className="mb-3">
					<label className="block mb-2 text-base font-bold" htmlFor="item3D-Y">
						<b>3D</b> is
					</label>
					<div className="box-border clear-both text-base relative">
						<label className="mr-6">
							<input
								defaultChecked={(searchParams.item3D ?? '') === ''}
								id="item3D-"
								name="item3D"
								type="radio"
								value=""
							/>{' '}
							-- Select 3D --
						</label>
						<label className="mr-6">
							<input
								defaultChecked={searchParams.item3D === 'Y'}
								id="item3D-Y"
								name="item3D"
								type="radio"
								value="Y"
							/>{' '}
							Yes
						</label>
						<label>
							<input
								defaultChecked={searchParams.item3D === 'N'}
								id="item3D-N"
								name="item3D"
								type="radio"
								value="N"
							/>{' '}
							No
						</label>
					</div>
				</div>
				<div className="mb-3">
					<label
						className="block mb-2 text-base font-bold"
						htmlFor="itemdigitl">
						<b>Digital Type</b> is
					</label>
					<div className="box-border clear-both text-base relative">
						<select
							className="w-full bg-white border border-gray-300 rounded py-2 px-3"
							defaultValue={searchParams.itemdigitl}
							id="itemdigitl"
							name="itemdigitl">
							<option value="">-- Select Digital Type --</option>
							<option value="None">None</option>
							<option value="DC">Digital Copy</option>
							<option value="UV">Ultraviolet</option>
							<option value="DC+UV">Digital Copy + Ultraviolet</option>
						</select>
					</div>
				</div>
				<div className="mb-3">
					<label className="block mb-2 text-base font-bold" htmlFor="itemcase">
						<b>Case Type</b> is
					</label>
					<div className="box-border clear-both text-base relative">
						<select
							className="w-full bg-white border border-gray-300 rounded py-2 px-3"
							defaultValue={searchParams.itemcase}
							id="itemcase"
							name="itemcase">
							<option value="">-- Select Case Type --</option>
							<option value="Plain">Plain</option>
							<option value="Box">Box</option>
							<option value="Digibook">Digibook</option>
							<option value="Slipcover">Slipcover</option>
							<option value="Steelbook">Steelbook</option>
						</select>
					</div>
				</div>
				<div className="mb-3">
					<label
						className="block mb-2 text-base font-bold"
						htmlFor="itemstatus">
						<b>Status</b> is
					</label>
					<div className="box-border clear-both text-base relative">
						<select
							className="w-full bg-white border border-gray-300 rounded py-2 px-3"
							defaultValue={searchParams.itemstatus}
							id="itemstatus"
							name="itemstatus">
							<option value="">-- Select Status --</option>
							<option value="Owned">Owned</option>
							<option value="Wanted">Wanted</option>
							<option value="Selling">Selling</option>
							<option value="Waiting">Waiting</option>
						</select>
					</div>
				</div>
				<button
					className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
					type="reset">
					Reset
				</button>
				&nbsp;
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit">
					Filter
				</button>
			</form>
		</div>
	);
};

export default Filters;
