import { create } from "zustand";
import { AuthResponse, UserType } from "../utils/types";
import { createJSONStorage, persist } from "zustand/middleware";
// import { CONSTANTS } from "../utils/constant";

interface UserStoreState {
	isAuthenticated: boolean;
	user: UserType | null;
	token: string | null;
	setSession: (data: AuthResponse) => void;
	logOut: () => void;
}
const initialState: Omit<UserStoreState, "setSession" | "logOut"> = {
	user: null,
	token: null,
	isAuthenticated: false,
};
export const useUserStore = create<UserStoreState>()(
	persist(
		(set) => ({
			...initialState,
			setSession: (data: AuthResponse) => {
				set({
					user: data.user,
					token: data.token,
					isAuthenticated: true,
				});
			},
			logOut: () => {
				set(initialState);
			},
		}),
		{
			name: "user-store",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export const userStore = useUserStore.getState();
