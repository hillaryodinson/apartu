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
// import { useMutation } from "@tanstack/react-query";
// import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { PropertyType } from "@/utils/types";
import { PropertySchema } from "@/utils/zod";
import LocationSelector, {
	CountryProps,
	StateProps,
} from "@/components/site/location-picker";

const AddPropertyForm = () => {
	const [countryName, setCountryName] = useState("");
	const [stateName, setStateName] = useState("");
	const [isLoading, startTransition] = useTransition();

	const form = useForm<PropertyType>({
		resolver: zodResolver(PropertySchema),
		defaultValues: {
			name: "",
			country: "",
			state: "",
			address: "",
			type: undefined,
		},
	});

	const onSubmit = (data: PropertyType) => {
		startTransition(() => {
			console.log(data);
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 py-10">
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
