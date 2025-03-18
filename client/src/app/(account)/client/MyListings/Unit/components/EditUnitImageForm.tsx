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
import { ImageType } from "@/utils/types";

interface EditUnitFormProps {
	values: {
		images: ImageType[];
		unitId: string;
	};
	onEdit: () => void;
}

const EditUnitImageForm = ({ values, onEdit }: EditUnitFormProps) => {
	const { images, unitId } = values;

	const [isLoading, setIsLoading] = useState(false);
	const setUnitImages = usePropertyStore((state) => state.setUnitImages);
	const initialValues: z.infer<typeof UnitImageSchema> = {
		images: images,
	};

	const form = useForm<z.infer<typeof UnitImageSchema>>({
		resolver: zodResolver(UnitImageSchema),
		defaultValues: initialValues,
	});

	const onSubmit = (data: z.infer<typeof UnitImageSchema>) => {
		// startTransition(() => {
		console.log(unitId);
		setIsLoading(true);
		setUnitImages(data.images!);
		onEdit();
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
				<div className="flex justify-end">
					<Button
						type="submit"
						disabled={isLoading}
						variant={"default"}>
						{isLoading && (
							<Loader2 className="mr-2 h-4 w-4 stroke-green-500 animate-spin" />
						)}
						{isLoading ? "Saving..." : "Update Image"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default EditUnitImageForm;
