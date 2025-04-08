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
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CurrencyInput from "@/components/site/currency-input";
import { getCycleLabel, toCurrency } from "@/utils/helper";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { z } from "zod";
import { usePropertyStore } from "@/store/property-store";
import {
	ApiResponse,
	CategoryType,
	PropertyType,
	UnitBasicInfo,
} from "@/utils/types";
import { UnitBasicInfoSchema } from "@/utils/zod";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

interface AddUnitFormProps {
	property: PropertyType;
	hasUnit?: boolean;
	onNext: () => void;
}

type DisplayDataType = {
	amount: number;
	duration: number;
	cycle: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};

const AddUnitForm = ({
	property,
	hasUnit = false,
	onNext,
}: AddUnitFormProps) => {
	const setUnitBasicInfo = usePropertyStore(
		(state) => state.setUnitBasicInfo
	);
	const unitBasicInfo = usePropertyStore((state) => state.unitBasicInfo);
	const [displayData, setDisplayData] = useState<DisplayDataType>({
		amount: unitBasicInfo?.rentPrice || 0,
		duration: unitBasicInfo?.rentDuration || 1,
		cycle: unitBasicInfo?.rentCycle || "YEARLY",
	});

	const { data: subcats } = useQuery({
		queryKey: ["fetch_sub_cat", property.category.id],
		queryFn: async () => {
			if (!property.category.id) return [];
			const response = await api.get(`/category/${property.category.id}`);
			const result = (await response.data) as ApiResponse<CategoryType>;
			if (result.success) return result.data?.subCategory;
			return [];
		},
		enabled: !!property.category.id,
	});

	const initialValues: UnitBasicInfo = {
		name: !hasUnit ? property.name : "",
		typeId: !hasUnit ? "default" : "",
		rentPrice: displayData.amount,
		rentDuration: displayData.duration,
		rentCycle: displayData.cycle,
		propertyId: property.id,
	};

	const form = useForm<z.infer<typeof UnitBasicInfoSchema>>({
		resolver: zodResolver(UnitBasicInfoSchema),
		defaultValues: initialValues,
	});

	const onSubmit = (data: z.infer<typeof UnitBasicInfoSchema>) => {
		setUnitBasicInfo({ ...data, propertyId: property.id });
		onNext();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
				method="POST">
				<div>
					{hasUnit && (
						<FormField
							control={form.control}
							name="typeId"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>
										What type of unit are you offering?
									</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex space-y-0">
											{subcats &&
												subcats.map((subcat) => (
													<FormItem
														className="flex items-center space-x-3 space-y-0"
														key={subcat.id}>
														<FormControl>
															<RadioGroupItem
																value={
																	subcat.id
																}
															/>
														</FormControl>
														<FormLabel className="font-normal">
															{subcat.name}
														</FormLabel>
													</FormItem>
												))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unit Name</FormLabel>
							<FormControl>
								<Input
									placeholder=""
									type="text"
									{...field}
									disabled={!hasUnit}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col space-y-4">
					<FormDescription className="font-medium text-slate-900">
						<small className="text-lg">
							I want my tenant to pay{" "}
							{toCurrency(displayData.amount)} every{" "}
							{displayData.duration}{" "}
							{getCycleLabel({
								duration: displayData.duration,
								cycle: displayData.cycle,
							})}
						</small>
					</FormDescription>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
						<CurrencyInput
							form={form}
							label="Rent Cost"
							name="rentPrice"
							placeholder="1000"
							onChange={() => {
								setDisplayData({
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
											onChange={(
												e: React.ChangeEvent<HTMLInputElement>
											) => {
												field.onChange(e);
												setDisplayData({
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
												setDisplayData({
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
				<div className="flex justify-end">
					<div className="flex space-x-2">
						<Button type="submit" variant={"default"}>
							Next
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default AddUnitForm;
