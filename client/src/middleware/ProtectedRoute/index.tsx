import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/user-store";
import { useLocation } from "react-router-dom";
// import { useAuth } from '../../providers/auth-provider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();

	//   const { user } = useAuth(); // Destructure directly from useAuth()
	const { user, logOut, token } = useUserStore((state) => state);
	console.log("PROTECTED ROUTE TOKEN", token);

	// If there is no user (not authenticated), redirect to login
	if (!user || !token) {
		logOut();
		return <Navigate to="/login" />;
	}

	if (token) {
		const expiryTime = JSON.parse(atob(token.split(".")[1])).exp;
		const currentTime = Date.now() / 1000;
		if (expiryTime < currentTime) {
			console.log("Force Logout");
			return null;
			logOut();
			return <Navigate to="/login" />;
		}
	}

	const userRole = user?.role as
		| "admin"
		| "landlord"
		| "tenant"
		| "caretaker";
	if (userRole === "admin") {
		if (!location.pathname.startsWith("/ap-admin/")) {
			return <Navigate to="/ap-admin/" />;
		}
	} else if (userRole === "landlord") {
		if (!location.pathname.startsWith("/ll/")) {
			return <Navigate to="/ll/dashboard" />;
		}
	} else if (userRole === "caretaker") {
		if (!location.pathname.startsWith("/ct/")) {
			return <Navigate to="/ct/dashboard" />;
		}
	} else if (userRole === "tenant") {
		if (!location.pathname.startsWith("/tn/")) {
			return <Navigate to="/tn/dashboard" />;
		}
	}

	// If user is authenticated, render the nested routes
	return <>{children}</>;
};

export default ProtectedRoute;
