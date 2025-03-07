import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/HomePage";
import LoginPage from "./app/(auth)/Login";
import SignUpPage from "./app/(auth)/Signup";
import { AuthProvider } from "./providers/auth-provider";
import ProtectedRoute from "./middleware/ProtectedRoute";
import NotFound from "./app/NotFound";
import DashboardPage from "./app/(account)/client/Dashboard";
import PropertyDetailsPage from "./app/PropertyDetailsPage";
import FrontendLayout from "./components/layout/frontend";
import PropertyListingPage from "./app/PropertyListingPage";
import { ToastContainer } from "react-toastify";
import BackendLayout from "./components/layout/backend";
import AccountActivationPage from "./app/(auth)/AccountActivation";
import MyPropertiesPage from "./app/(account)/client/Properties";

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
					path: "properties",
					element: <PropertyListingPage />,
				},
				{
					path: "properties/:propertyId",
					element: <PropertyDetailsPage />,
				},
			],
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/activate",
			element: <AccountActivationPage />,
		},
		{
			path: "/signup",
			element: <SignUpPage />,
		},
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<BackendLayout />
				</ProtectedRoute>
			), // This should be the only protected wrapper
			children: [
				{
					path: "/dashboard",
					element: <DashboardPage />,
				},
				{
					path: "/dashboard/properties",
					element: <MyPropertiesPage />,
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
			<ToastContainer />
		</AuthProvider>
	);
}

export default App;
