import {
	BookOpen,
	Bot,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
	User,
} from "lucide-react";

// This is sample data.
export const RouteData = {
	navMain: [
		{
			title: "Quick Links",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
				},
			],
		},
		{
			title: "My Properties",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Properties",
					url: "/my-listings/properties",
				},
			],
		},
		{
			title: "Tenants",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Incoming Applications",
					url: "#",
				},
				{
					title: "Active Tenants",
					url: "#",
				},
				{
					title: "Past Tenants",
					url: "#",
				},
				{
					title: "Complaints",
					url: "#",
				},
			],
		},
		{
			title: "Rents",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "Upcoming Rent",
					url: "#",
				},
				{
					title: "Rent History",
					url: "#",
				},
			],
		},
	],
	adminNav: [
		{
			title: "Quick Links",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Category",
					url: "/category/properties",
				},
				{
					title: "Sub Category",
					url: "/category/sub-categories",
				},
				{
					title: "Property Attributes",
					url: "/attributes/properties",
				},
				{
					title: "Unit Attributes",
					url: "/attributes/units",
				},
			],
		},
		{
			title: "Properties",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Properties",
					url: "/listings/properties",
				},
			],
		},
		{
			title: "Users",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "LandLords",
					url: "#",
				},
				{
					title: "Care Takers",
					url: "#",
				},
				{
					title: "Tenants",
					url: "#",
				},
			],
		},
	],
	sharedNav: [
		{
			name: "Account Settings",
			url: "/account",
			icon: User,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};
