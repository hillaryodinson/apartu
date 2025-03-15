"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePropertyStore } from "@/store/property-store";
import AddPropertyForm from "./AddPropertyForm";
import AddUnitForm from "../../Unit/components/AddUnitBasicInfoForm";
import { PropertyType } from "@/utils/types";
import AddUnitImageForm from "../../Unit/components/AddUnitImageForm";
import api from "@/utils/api";
import { toast } from "react-toastify";

export function PropertyModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (value: boolean) => void;
}) {
	const [currentStep, setCurrentStep] = useState(1);
	const [hasUnit, setHasUnit] = useState(false);
	const resetStore = usePropertyStore((state) => state.resetStore);
	const [property, setProperty] = useState<PropertyType | null>(null);

	const totalSteps = 3;

	const handleClose = () => {
		setOpen(false);
		setCurrentStep(1);
		resetStore();
	};

	const handleNext = (property?: PropertyType) => {
		if (property) setProperty(property);
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = async () => {
		try {
			const basicUnitData = usePropertyStore.getState().unitBasicInfo;
			const unitImage = usePropertyStore.getState().unitImages;
			const unitData = { ...basicUnitData, images: unitImage };
			const response = await api.post(
				`/property/${property?.id}/unit`,
				unitData
			);

			const responseData = response.data as {
				success: boolean;
				message: string;
			};
			if (!responseData.success) {
				throw new Error(responseData.message);
			}
			toast.success("Property was created successfully");
			handleClose();
		} catch (error) {
			console.log(error);
			toast.error(
				"An error occured while creating property. Please try again"
			);
		}
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Add New Property</DialogTitle>
					</DialogHeader>

					<div className="mb-6">
						<div className="flex justify-between mb-4">
							{Array.from({ length: totalSteps }).map(
								(_, index) => (
									<div
										key={index}
										className="flex flex-col items-center">
										<div
											className={cn(
												"w-10 h-10 rounded-full flex items-center justify-center border-2",
												currentStep > index + 1
													? "bg-primary text-primary-foreground border-primary"
													: currentStep === index + 1
													? "border-primary text-primary"
													: "border-muted text-muted-foreground"
											)}>
											{currentStep > index + 1 ? (
												<Check className="h-5 w-5" />
											) : (
												index + 1
											)}
										</div>
										<span
											className={cn(
												"text-xs mt-1",
												currentStep === index + 1
													? "text-primary font-medium"
													: "text-muted-foreground"
											)}>
											{index === 0
												? "Property Details"
												: index === 1
												? "Unit Details"
												: "Images"}
										</span>
									</div>
								)
							)}
						</div>
						<div className="w-full bg-muted h-1 rounded-full">
							<div
								className="bg-primary h-1 rounded-full transition-all"
								style={{
									width: `${
										(currentStep / totalSteps) * 100
									}%`,
								}}
							/>
						</div>
					</div>

					<div className="py-4">
						{currentStep === 1 && (
							<AddPropertyForm
								onSuccessFn={handleNext}
								setHasUnit={setHasUnit}
							/>
						)}
						{currentStep === 2 && (
							//when the user adds an apartment he can select if he wants to rent it as one or individual units.
							//if individual is selected, the user must select the rent details.

							<AddUnitForm
								property={property!}
								onNext={handleNext}
								hasUnit={hasUnit}
							/>
						)}
						{currentStep === 3 && (
							<AddUnitImageForm
								onNext={handleSubmit}
								onBack={handleBack}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
