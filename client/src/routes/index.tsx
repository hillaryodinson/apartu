import HomePage from "../app/HomePage";
import LoginPage from "../app/(auth)/Login";
import SignUpPage from "../app/(auth)/Signup";
import ProtectedRoute from "../middleware/ProtectedRoute";
import NotFound from "../app/NotFound";
import DashboardPage from "../app/(account)/landlord/Dashboard";
import PropertyDetailsPage from "../app/PropertyDetailsPage";
import FrontendLayout from "../components/layout/frontend";
import PropertyListingPage from "../app/PropertyListingPage";
import BackendLayout from "../components/layout/backend";
import AccountActivationPage from "../app/(auth)/AccountActivation";
import MyPropertiesPage from "../app/(account)/landlord/MyListings/Property";
import MyPropertyDetailsPage from "../app/(account)/landlord/MyListings/PropertyDetail";
import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "@/app/(account)/admin/Dashboard";
import ApPropertiesPage from "@/app/(account)/admin/Properties";
export const routes = createBrowserRouter([
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
	// LANDLORD ROUTES
	{
		path: "/ll",
		element: (
			<ProtectedRoute>
				<BackendLayout />
			</ProtectedRoute>
		), // This should be the only protected wrapper
		children: [
			{
				path: "/ll/dashboard",
				element: <DashboardPage />,
			},
			{
				path: "/ll/my-listings/properties",
				element: <MyPropertiesPage />,
			},
			{
				path: "/ll/my-listings/properties/:propertyId",
				element: <MyPropertyDetailsPage />,
			},
		],
	},
	//CARETAKER ROUTES
	{
		path: "/ct",
		element: (
			<ProtectedRoute>
				<BackendLayout />
			</ProtectedRoute>
		), // This should be the only protected wrapper
		children: [
			{
				path: "/ct/dashboard",
				element: <DashboardPage />,
			},
			{
				path: "/ct/my-listings/properties",
				element: <MyPropertiesPage />,
			},
			{
				path: "/ct/my-listings/properties/:propertyId",
				element: <MyPropertyDetailsPage />,
			},
		],
	},
	// TENANT ROUTES
	{
		path: "/tn",
		element: (
			<ProtectedRoute>
				<BackendLayout />
			</ProtectedRoute>
		), // This should be the only protected wrapper
		children: [
			{
				path: "/tn/dashboard",
				element: <DashboardPage />,
			},
			{
				path: "/tn/my-listings/properties",
				element: <MyPropertiesPage />,
			},
			{
				path: "/tn/my-listings/properties/:propertyId",
				element: <MyPropertyDetailsPage />,
			},
		],
	},
	{
		path: "/ap-admin",
		element: (
			<ProtectedRoute>
				<BackendLayout />
			</ProtectedRoute>
		), // This should be the only protected wrapper
		children: [
			{
				path: "/ap-admin/",
				element: <AdminDashboardPage />,
			},
			{
				path: "/ap-admin/listings/properties",
				element: <ApPropertiesPage />,
			},
			{
				path: "/ap-admin/listings/properties/:propertyId",
				element: <MyPropertyDetailsPage />,
			},
		],
	},
	{
		path: "/*",
		element: <NotFound />,
	},
]);
