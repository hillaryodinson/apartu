import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { UnitType } from "@/utils/types";
import { UnitSchema } from "@/utils/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CurrencyInput from "@/components/site/currency-input";
import { toCurrency } from "@/utils/helper";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const AddUnitForm = () => {
	const [isLoading, startTransition] = useTransition();
	type DataType = {
		amount: number;
		duration: number;
		cycle: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
	};

	const [data, setData] = useState<DataType>({
		amount: 10,
		duration: 1,
		cycle: "YEARLY",
	});

	const form = useForm<UnitType>({
		resolver: zodResolver(UnitSchema),
		defaultValues: {
			name: "",
			type: undefined,
			rentPrice: 10,
			rentDuration: 1,
			rentCycle: "YEARLY",
			availability: undefined,
		},
	});

	const onSubmit = (data: UnitType) => {
		startTransition(() => {
			console.log(data);
		});
	};

	function getCycleLabel(data: {
		duration: number;
		cycle: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
	}) {
		const cycles = {
			DAILY: data.duration > 1 ? "days" : "day",
			WEEKLY: data.duration > 1 ? "weeks" : "week",
			MONTHLY: data.duration > 1 ? "months" : "month",
			YEARLY: data.duration > 1 ? "years" : "year",
		};
		return cycles[data.cycle] || data.cycle;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
				<div>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="space-y-1">
								<FormLabel>
									What type of property are you offering?
								</FormLabel>
								<FormDescription>
									Select whether you're offering a part of
									your property or the entire property for
									rent.
								</FormDescription>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex flex-col space-y-0">
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="APARTMENT" />
											</FormControl>
											<FormLabel className="font-normal">
												Apartment: A separate living
												unit (e.g., a studio or
												one-bedroom apartment).
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="ROOM" />
											</FormControl>
											<FormLabel className="font-normal">
												Room: A single room within a
												property (e.g., a bedroom).
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="ENTIRE_PROPERTY" />
											</FormControl>
											<FormLabel className="font-normal">
												Entire Property: The whole
												property (e.g., a house or an
												entire building).
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Property Name</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									type="text"
									{...field}
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col space-y-4">
					<FormDescription className="font-medium text-slate-900">
						<p>
							I want my tenant to pay {toCurrency(data.amount)}{" "}
							every {data.duration}{" "}
							{getCycleLabel({
								duration: data.duration,
								cycle: data.cycle,
							})}
						</p>
					</FormDescription>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
						<CurrencyInput
							form={form}
							label="Rent Cost"
							name="rentPrice"
							placeholder="1000"
							onChange={() => {
								setData({
									amount: form.getValues("rentPrice"),
									duration: form.getValues("rentDuration"),
									cycle: form.getValues("rentCycle"),
								});
							}}
						/>
						<FormField
							control={form.control}
							name="rentDuration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rent Duration</FormLabel>
									<FormControl>
										<Input
											placeholder=""
											type="number"
											{...field}
											disabled={isLoading}
											onChange={(
												e: React.ChangeEvent<HTMLInputElement>
											) => {
												field.onChange(e);
												setData({
													amount: form.getValues(
														"rentPrice"
													),
													duration: Number(
														e.target.value
													),
													cycle: form.getValues(
														"rentCycle"
													),
												});
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rentCycle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rent Cycle</FormLabel>
									<FormControl>
										<Select
											onValueChange={(e) => {
												field.onChange(e);
												setData({
													amount: form.getValues(
														"rentPrice"
													),
													duration:
														form.getValues(
															"rentDuration"
														),
													cycle: form.getValues(
														"rentCycle"
													),
												});
											}}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a rent cycle" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="DAILY">
													Daily
												</SelectItem>
												<SelectItem value="WEEKLY">
													Weekly
												</SelectItem>
												<SelectItem value="MONTHLY">
													Monthly
												</SelectItem>
												<SelectItem value="YEARLY">
													Yearly
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="flex justify-between">
					<Button
						type="submit"
						disabled={isLoading}
						variant={"outline"}>
						{isLoading && (
							<Loader2 className="mr-2 h-4 w-4 stroke-green-500 animate-spin" />
						)}{" "}
						{isLoading ? "Saving..." : "Skip Step"}
					</Button>
					<div className="flex">
						<Button
							type="submit"
							disabled={isLoading}
							variant={"secondary"}>
							{isLoading && (
								<Loader2 className="mr-2 h-4 w-4 stroke-green-500 animate-spin" />
							)}{" "}
							{isLoading ? "Saving..." : "Save Unit"}
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading && (
								<Loader2 className="mr-2 h-4 w-4 stroke-green-500 animate-spin" />
							)}{" "}
							{isLoading
								? "Saving..."
								: "Save and add another Unit"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default AddUnitForm;
