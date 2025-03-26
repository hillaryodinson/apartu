import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ApiResponse, AttributeType } from "@/utils/types";
import { AttributeSchema } from "@/utils/zod";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type AddCategoryFormProps = {
	onSuccessFn: () => void;
	value?: AttributeType | undefined;
};

const attributeData = {
	types: ["property", "unit"],
	valueTypes: ["boolean", "number", "string"],
};
const AddAttributeForm = ({ onSuccessFn, value }: AddCategoryFormProps) => {
	const [isLoading, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof AttributeSchema>>({
		resolver: zodResolver(AttributeSchema),
		defaultValues: {
			name: value ? value.name : "",
			type: value ? value.type : "",
			valueType: value ? value.valueType : "",
		},
	});

	const createAttribute = useMutation({
		mutationFn: async (data: z.infer<typeof AttributeSchema>) => {
			const response = await api.post("/attributes", data);
			const result = (await response.data) as ApiResponse<AttributeType>;
			if (result.success) {
				return result.data;
			}

			throw new Error(result.message);
		},
		onSuccess: () => {
			toast.success("Category created successfully");
			form.reset();
			onSuccessFn();
			queryClient.invalidateQueries({
				queryKey: ["fetch_attributes"],
			});
		},
		onError: (error: any, variable) => {
			console.log(error, variable);
			toast.error(
				(error.response?.data?.message as string) || "An error occurred"
			);
		},
	});

	const updateAttribute = useMutation({
		mutationFn: async (data: z.infer<typeof AttributeSchema>) => {
			const response = await api.put(`/attributes/${value?.id}`, data);
			const result = (await response.data) as ApiResponse<AttributeType>;
			if (result.success) {
				return result.data;
			}

			throw new Error(result.message);
		},
		onSuccess: () => {
			toast.success("Attribute updated successfully");
			form.reset();
			onSuccessFn();
			queryClient.invalidateQueries({
				queryKey: ["fetch_attributes"],
			});
		},
		onError: (error: any, variable) => {
			console.log(error, variable);
			toast.error(
				(error.response?.data?.message as string) || "An error occurred"
			);
		},
	});

	const onSubmit = (data: z.infer<typeof AttributeSchema>) => {
		startTransition(() => {
			if (value == undefined) {
				createAttribute.mutate(data);
			} else {
				updateAttribute.mutate(data);
			}
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
				method="POST">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Attribute Name</FormLabel>
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
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Name</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select the type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{attributeData.types &&
											attributeData.types.map((type) => (
												<SelectItem
													value={type}
													key={type}>
													{type}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="valueType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Value Type</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select the type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{attributeData.valueTypes &&
											attributeData.valueTypes.map(
												(type) => (
													<SelectItem
														value={type}
														key={type}>
														{type}
													</SelectItem>
												)
											)}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end">
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<Loader2 className="mr-2 h-4 w-4 stroke-green-500 animate-spin" />
						)}{" "}
						{isLoading ? "Saving..." : "Save"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default AddAttributeForm;
