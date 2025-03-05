import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./app/Home";
import LoginPage from "./app/(auth)/Login";
import SignUpPage from "./app/(auth)/Signup";
import { AuthProvider } from "./providers/auth-provider";
import ProtectedRoute from "./middleware/ProtectedRoute";
import DashboardPage from "./app/(account)/client/Dashboard";

function App() {
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/signup",
			element: <SignUpPage />,
		},
		{
			path: "/",
			element: <ProtectedRoute />, // This should be the only protected wrapper
			children: [
				{
					path: "/dashboard",
					element: <DashboardPage />,
				},
			],
		},
	]);

	return (
		<AuthProvider>
			<RouterProvider router={routes} />
		</AuthProvider>
	);
}

export default App;
