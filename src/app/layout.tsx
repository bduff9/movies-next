import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';

import 'react-loading-skeleton/dist/skeleton.css';

export const metadata: Metadata = {
	title: 'Movie Tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ClerkProvider>
					<Header />
					{children}
				</ClerkProvider>
			</body>
		</html>
	);
}
