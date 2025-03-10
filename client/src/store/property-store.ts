import { PropertyType } from "@/utils/types";
import { create } from "zustand";

interface PropertyStoreState {
	selectedProperty: PropertyType | null;
	setSelectedProperty: (property: PropertyType) => void;
}

const initialState: Omit<PropertyStoreState, "setSelectedProperty"> = {
	selectedProperty: null,
};

export const usePropertyStore = create<PropertyStoreState>((set) => ({
	...initialState,
	setSelectedProperty: (property: PropertyType) => {
		set({ selectedProperty: property });
	},
}));
