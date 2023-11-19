import { SignIn } from '@clerk/nextjs';
import { FC } from 'react';

export const runtime = 'edge';

const SignInPage: FC = () => {
	return (
		<div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<SignIn />
			</div>
		</div>
	);
};

export default SignInPage;
