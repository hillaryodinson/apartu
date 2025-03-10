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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ApiResponse, PropertyType } from "@/utils/types";
import { PropertySchema } from "@/utils/zod";
import LocationSelector, {
	CountryProps,
	StateProps,
} from "@/components/site/location-picker";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";

const AddPropertyForm = ({
	onSuccessFn,
}: {
	onSuccessFn: (data: string) => void;
}) => {
	const [countryName, setCountryName] = useState("");
	const [stateName, setStateName] = useState("");
	const [isLoading, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof PropertySchema>>({
		resolver: zodResolver(PropertySchema),
		defaultValues: {
			name: "",
			country: "",
			state: "",
			address: "",
			type: undefined,
		},
	});

	const createProperty = useMutation({
		mutationFn: async (data: z.infer<typeof PropertySchema>) => {
			const response = await api.post("/property", data);
			const result = (await response.data) as ApiResponse<PropertyType>;
			if (result.success) {
				return result.data;
			}

			throw new Error(result.message);
		},
		onSuccess: (data) => {
			toast.success("Property created successfully");
			form.reset();
			if (data) onSuccessFn(data.id);
			queryClient.invalidateQueries({
				queryKey: ["fetch_my_properties"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: z.infer<typeof PropertySchema>) => {
		startTransition(() => {
			createProperty.mutate(data);
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 py-10"
				method="POST">
				<div>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>
									What type of property are you offering?
								</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex space-y-0">
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="APARTMENT_COMPLEX" />
											</FormControl>
											<FormLabel className="font-normal">
												Apartment Complex
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="HOUSE" />
											</FormControl>
											<FormLabel className="font-normal">
												House
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="ESTATE" />
											</FormControl>
											<FormLabel className="font-normal">
												Estate
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

				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Country</FormLabel>
							<FormControl>
								<LocationSelector
									disabled={isLoading}
									onCountryChange={(
										country: CountryProps | null
									) => {
										setCountryName(country?.name || "");
										form.setValue(
											field.name,
											country?.name || ""
										);
									}}
									onStateChange={(
										state: StateProps | null
									) => {
										setStateName(state?.name || "");
										form.setValue(
											"state",
											state?.name || ""
										);
									}}
								/>
							</FormControl>
							<FormDescription>
								If your country has states/provinces, it will be
								appear after selecting country
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea
									disabled={isLoading}
									placeholder=""
									className="resize-none"
									{...field}
									onBlur={(e) =>
										form.setValue(
											"address",
											[
												e.target.value,
												countryName || "",
												stateName || "",
											].join(", ")
										)
									}
								/>
							</FormControl>
							<FormDescription>
								Your place of residence so we can ship directly
								to you
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading && (
						<Loader2 className="mr-2 h-4 w-4 stroke-green-500 animate-spin" />
					)}{" "}
					{isLoading ? "Saving..." : "Create Property"}
				</Button>
			</form>
		</Form>
	);
};

export default AddPropertyForm;
