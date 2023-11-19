import { currentUser } from '@clerk/nextjs';

export const requireAdmin = async () => {
	const user = await currentUser();

	if (!user) {
		throw new Error('Not signed in');
	}

	const isAdmin = user.emailAddresses.some(
		(email) => email.emailAddress === 'bduff9@gmail.com'
	);

	if (!isAdmin) {
		throw new Error('Not an admin');
	}
};
