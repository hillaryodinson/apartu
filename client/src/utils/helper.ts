export const toCurrency = (value: number, currency: string = "NGN") => {
	// return value.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency,
	}).format(value);
};
