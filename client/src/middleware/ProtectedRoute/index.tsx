import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/user-store";
// import { useAuth } from '../../providers/auth-provider';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	//   const { user } = useAuth(); // Destructure directly from useAuth()
	const user = useUserStore((state) => state.user);

	// If there is no user (not authenticated), redirect to login
	if (!user) {
		return <Navigate to="/login" />;
	}

	// If user is authenticated, render the nested routes
	return <>{children}</>;
};

export default ProtectedRoute;
