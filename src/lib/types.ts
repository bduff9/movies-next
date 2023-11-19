import { FC } from 'react';

/**
 * Next.js Page component
 */
export type NP<Props = Record<string, never>> = FC<
	{
		params: { [key: string]: string };
		searchParams: { [key: string]: string | string[] | undefined };
	} & Props
>;
