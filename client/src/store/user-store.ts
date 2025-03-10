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
	validateToken: () => void;
}

const initialState: Omit<
	UserStoreState,
	"setSession" | "logOut" | "validateToken"
> = {
	user: null,
	token: null,
	isAuthenticated: false,
};

const validateToken = (token: string | null): boolean => {
	// Implement your token validation logic here
	// For example, you can check if the token is expired
	if (!token) return false;
	// Assuming the token is a JWT, you can decode and check its expiration
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.exp > Date.now() / 1000;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const useUserStore = create<UserStoreState>()(
	persist(
		(set, get) => ({
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
			validateToken: () => {
				const token = get().token;
				if (validateToken(token)) {
					set({ isAuthenticated: true });
				} else {
					set(initialState);
				}
			},
		}),
		{
			name: "user-store",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.validateToken();
				}
			},
		}
	)
);

export const userStore = useUserStore.getState();
