import { PropertyType, UnitBasicInfo, UnitImageInfo } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PropertyAttributes = {
	rooms: string;
	toilets: string;
	isFurnished: boolean;
	hasWifi: boolean;
	hasCarPark: boolean;
	hasWalkInCloset: boolean;
};

interface PropertyStore {
	unitBasicInfo: UnitBasicInfo | null;
	unitImages: UnitImageInfo;
	selectedProperty: PropertyType | null;

	setSelectedProperty: (property: PropertyType) => void;
	setUnitBasicInfo: (data: UnitBasicInfo) => void;
	setUnitImages: (files: UnitImageInfo) => void;
	resetStore: () => void;
	submitProperty: () => Promise<void>;
}

export const usePropertyStore = create<PropertyStore>()(
	persist(
		(set, get) => ({
			unitBasicInfo: null,
			propertyAttributes: null,
			unitImages: [],
			selectedProperty: null,

			setSelectedProperty: (property) =>
				set({ selectedProperty: property }),
			setUnitBasicInfo: (data) => set({ unitBasicInfo: data }),
			setUnitImages: (data) => set({ unitImages: data }),

			resetStore: () =>
				set({
					unitBasicInfo: null,
					unitImages: [],
				}),

			submitProperty: async () => {
				const { unitBasicInfo, unitImages } = get();

				if (!unitBasicInfo || !unitImages) {
					throw new Error("Missing property data");
				}

				// Here you would typically send the formData to your API
				// For demonstration purposes, we'll just log it and return a promise
				console.log("Property data ready for submission:", {
					basics: unitBasicInfo,
					images: `${unitImages.length} images`,
				});

				// Simulate API call
				return new Promise((resolve) => {
					setTimeout(() => {
						console.log("Property created successfully!");
						resolve();
					}, 2000);
				});
			},
		}),
		{
			name: "property-storage",
			// Only persist the data fields, not the functions
			partialize: (state) => ({
				unitBasicInfo: state.unitBasicInfo,
				unitImages: null,
			}),
		}
	)
);
