export const toCurrency = (value: number, currency: string = "NGN") => {
	// return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency,
	}).format(value);
};

export const getCycleLabel = (data: {
	duration: number;
	cycle: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
}) => {
	const cycles = {
		DAILY: data.duration > 1 ? "days" : "day",
		WEEKLY: data.duration > 1 ? "weeks" : "week",
		MONTHLY: data.duration > 1 ? "months" : "month",
		YEARLY: data.duration > 1 ? "years" : "year",
	};
	return cycles[data.cycle] || data.cycle;
};
