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
import { ApiResponse, CategoryType } from "@/utils/types";
import { CategorySchema } from "@/utils/zod";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { z } from "zod";

type AddCategoryFormProps = {
	categoryId: string;
	onSuccessFn: () => void;
	value?: CategoryType | undefined;
};
const AddSubCategoryForm = ({
	categoryId,
	onSuccessFn,
	value,
}: AddCategoryFormProps) => {
	const [isLoading, startTransition] = useTransition();
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof CategorySchema>>({
		resolver: zodResolver(CategorySchema),
		defaultValues: {
			name: value ? value.name : "",
		},
	});

	const createCategory = useMutation({
		mutationFn: async (data: z.infer<typeof CategorySchema>) => {
			const response = await api.post(`/category/${categoryId}`, data);
			const result = (await response.data) as ApiResponse<CategoryType>;
			if (result.success) {
				return result.data;
			}

			throw new Error(result.message);
		},
		onSuccess: () => {
			toast.success("Sub category created successfully");
			form.reset();
			onSuccessFn();
			queryClient.invalidateQueries({
				queryKey: ["fetch_sub_cat", categoryId],
			});
		},
		onError: (error: any, variable) => {
			console.log(error, variable);
			toast.error(
				(error.response?.data?.message as string) || "An error occurred"
			);
		},
	});

	const updateCategory = useMutation({
		mutationFn: async (data: z.infer<typeof CategorySchema>) => {
			const response = await api.put(`/category/${value?.id}`, data);
			const result = (await response.data) as ApiResponse<CategoryType>;
			if (result.success) {
				return result.data;
			}

			throw new Error(result.message);
		},
		onSuccess: () => {
			toast.success("Sub category updated successfully");
			form.reset();
			onSuccessFn();
			queryClient.invalidateQueries({
				queryKey: ["fetch_categories"],
			});
		},
		onError: (error: any, variable) => {
			console.log(error, variable);
			toast.error(
				(error.response?.data?.message as string) || "An error occurred"
			);
		},
	});

	const onSubmit = (data: z.infer<typeof CategorySchema>) => {
		startTransition(() => {
			if (value == undefined) {
				createCategory.mutate(data);
			} else {
				updateCategory.mutate(data);
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
							<FormLabel>Sub Category Name</FormLabel>
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

export default AddSubCategoryForm;
