import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useReducer } from "react";
import { UseFormReturn } from "react-hook-form";

type TextInputProps = {
	form: UseFormReturn<any>;
	name: string;
	label: string;
	placeholder?: string;
	onChange?: () => void;
};

// Brazilian currency config
const moneyFormatter = Intl.NumberFormat("en-NG", {
	currency: "NGN",
	currencyDisplay: "symbol",
	currencySign: "standard",
	style: "currency",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const CurrencyInput = (props: TextInputProps) => {
	const initialValue = props.form.getValues()[props.name]
		? moneyFormatter.format(props.form.getValues()[props.name])
		: "";

	const [value, setValue] = useReducer((_: string, next: string) => {
		const digits = next.replace(/\D/g, "");
		return moneyFormatter.format(Number(digits) / 100);
	}, initialValue);

	function handleChange(
		realChangeFn: (value: number) => void,
		formattedValue: string
	): void {
		const digits = formattedValue.replace(/\D/g, "");
		const realValue = Number(digits) / 100;
		realChangeFn(realValue);
	}

	return (
		<FormField
			control={props.form.control}
			name={props.name}
			render={({ field }) => {
				field.value = value;
				const _change = field.onChange;

				return (
					<FormItem>
						<FormLabel>{props.label}</FormLabel>
						<FormControl>
							<Input
								placeholder={props.placeholder}
								type="text"
								{...field}
								onChange={(ev) => {
									setValue(ev.target.value);
									handleChange(_change, ev.target.value);
									if (props.onChange) {
										props.onChange();
									}
								}}
								value={value}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

export default CurrencyInput;
