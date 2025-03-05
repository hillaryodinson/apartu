import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./app/HomePage";
import LoginPage from "./app/(auth)/Login";
import SignUpPage from "./app/(auth)/Signup";
import { AuthProvider } from "./providers/auth-provider";
import ProtectedRoute from "./middleware/ProtectedRoute";
import DashboardPage from "./app/(account)/client/Dashboard";
import NotFound from "./app/NotFound";
import PropertyDetails from "./app/PropertyDetailsPage";
import FrontendLayout from "./components/layout/frontend";

function App() {
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <FrontendLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: "property/details/:propertyId",
					element: <PropertyDetails />,
				},
			],
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
		{
			path: "/*",
			element: <NotFound />,
		},
	]);

	return (
		<AuthProvider>
			<RouterProvider router={routes} />
		</AuthProvider>
	);
}

export default App;
