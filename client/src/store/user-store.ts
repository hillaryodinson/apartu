import { create } from "zustand";
import { AuthResponse, UserType } from "../utils/types";
import { createJSONStorage, persist } from "zustand/middleware";
// import { CONSTANTS } from "../utils/constant";

interface UserStoreState {
    user: UserType | null,
    token: string,
    setSession: (data: AuthResponse) => void
}
export const useUserStore = create<UserStoreState>()(
    persist(
    (set) => ({
        user: null,
        token: '',
        setSession: (data: AuthResponse) => {
            // localStorage.setItem(CONSTANTS.token, data.token);
            // localStorage.setItem(CONSTANTS.user, JSON.stringify(data.user));

            set({user: data.user, token: data.token})
        }
    }), {
        name:'user-store',
        storage: createJSONStorage(() => localStorage)
    })
)