export const getFormattedDate = (date: Date): string => {
	//FIXME: TZ adjustment here
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

	const formatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		weekday: 'short',
	});

	return formatter.format(date);
};
