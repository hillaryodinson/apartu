import { createContext, useContext, ReactNode, useState } from "react";
import { AuthResponse, UserType } from "../utils/types"; // Make sure these are correctly typed
import { CONSTANTS } from "../utils/constant";  // Ensure constants are correctly defined

interface AuthContextType {
    user: UserType | null;
    login: (data: AuthResponse) => Promise<void>;
    logout: () => void;
    token: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: () => {},
    token: null,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Synchronously check localStorage before initializing state
    const storedUser = localStorage.getItem(CONSTANTS.user);
    const storedToken = localStorage.getItem(CONSTANTS.token);

    const [user, setUser] = useState<UserType | null>(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] = useState<string | null>(storedToken);

    const login = async (data: AuthResponse) => {
        console.log("Synced context login", data);

        // Save user and token to localStorage
        localStorage.setItem(CONSTANTS.token, data.token);
        localStorage.setItem(CONSTANTS.user, JSON.stringify(data.user));

        // Set state in the context
        setUser(data.user);
        setToken(data.token);
    };

    const logout = () => {
        // Clear user and token from state
        setUser(null);
        setToken(null);

        // Also remove them from localStorage
        localStorage.removeItem(CONSTANTS.user);
        localStorage.removeItem(CONSTANTS.token);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};
