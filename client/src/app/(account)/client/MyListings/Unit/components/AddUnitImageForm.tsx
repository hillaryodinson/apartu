import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import DropzoneInput from "@/components/site/dropzone";
import { UnitImageSchema } from "@/utils/zod";
import { z } from "zod";
import { usePropertyStore } from "@/store/property-store";

interface AddUnitFormProps {
	onNext: () => void;
	onBack: () => void;
}

const AddUnitImageForm = ({ onNext, onBack }: AddUnitFormProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const setUnitImages = usePropertyStore((state) => state.setUnitImages);
	const initialValues: z.infer<typeof UnitImageSchema> = {
		images: [],
	};

	const form = useForm<z.infer<typeof UnitImageSchema>>({
		resolver: zodResolver(UnitImageSchema),
		defaultValues: initialValues,
	});

	const onSubmit = (data: z.infer<typeof UnitImageSchema>) => {
		// startTransition(() => {
		setIsLoading(true);
		setUnitImages(data.images!);
		onNext();
		setIsLoading(false);
		// });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-10"
				method="POST">
				<FormField
					control={form.control}
					name="images"
					render={() => (
						<DropzoneInput
							onChange={(value) => {
								form.setValue(
									"images",
									value.map((file) => ({
										image: file.image,
										thumb: file.thumb,
									}))
								);
							}}
						/>
					)}
				/>
				<div className="flex justify-between">
					<Button
						type="button"
						disabled={isLoading}
						variant={"outline"}
						onClick={() => onBack()}>
						Back
					</Button>
					<div className="flex space-x-2">
						<Button
							type="submit"
							disabled={isLoading}
							variant={"default"}>
							{isLoading && (
								<Loader2 className="mr-2 h-4 w-4 stroke-green-500 animate-spin" />
							)}
							{isLoading ? "Saving..." : "Save Unit"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default AddUnitImageForm;
