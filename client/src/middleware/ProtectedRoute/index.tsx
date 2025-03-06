import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/user-store";
// import { useAuth } from '../../providers/auth-provider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	//   const { user } = useAuth(); // Destructure directly from useAuth()
	const { user, logOut, token } = useUserStore((state) => state);

	// If there is no user (not authenticated), redirect to login
	if (!user || !token) {
		logOut();
		return <Navigate to="/login" />;
	}

	if (token) {
		const expiryTime = JSON.parse(atob(token.split(".")[1])).exp;
		const currentTime = Date.now() / 1000;
		if (expiryTime < currentTime) {
			logOut();
			return <Navigate to="/login" />;
		}
	}

	// If user is authenticated, render the nested routes
	return <>{children}</>;
};

export default ProtectedRoute;
