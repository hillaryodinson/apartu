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
import AddUnitImageForm from "./AddUnitImageForm";
import { usePropertyStore } from "@/store/property-store";
import AddUnitForm from "./AddUnitBasicInfoForm";
import { PropertyType } from "@/utils/types";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export function AddUnitModal({
	property,
	setOpen,
	open,
}: {
	property: PropertyType;
	setOpen: (value: boolean) => void;
	open: boolean;
}) {
	const [currentStep, setCurrentStep] = useState(1);
	const { resetStore } = usePropertyStore();
	const queryClient = useQueryClient();

	const totalSteps = 2;

	const handleClose = () => {
		setOpen(false);
		setCurrentStep(1);
		resetStore();
	};

	const handleNext = () => {
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
			// Here you would typically send the data to your API
			const response = await api.post(`/property/${property.id}/unit`, {
				...usePropertyStore.getState().unitBasicInfo,
				images: usePropertyStore.getState().unitImages,
			});

			if (response.status === 201) {
				toast.success("Unit added successfully");
				queryClient.invalidateQueries({
					queryKey: ["fetch_property_units", property.id],
				});
			}
			handleClose();
		} catch (error) {
			console.error("Failed to submit property:", error);
		}
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Add New Unit</DialogTitle>
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
											{index === 0 ? "Basics" : "Images"}
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
							<AddUnitForm
								onNext={handleNext}
								property={property}
							/>
						)}
						{currentStep === 2 && (
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
