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
	landlord: [
		{
			title: "Quick Links",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/ll/dashboard",
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
					url: "/ll/my-listings/properties",
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
	caretaker: [
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
	tenant: [
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
					url: "/tn/my-listings/properties",
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
	admin: [
		{
			title: "Quick Links",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/ap-admin/dashboard",
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
					url: "/ap-admin/category",
				},
				{
					title: "Sub Category",
					url: "/ap-admin/category/sub-categories",
				},
				{
					title: "Property Attributes",
					url: "/ap-admin/attributes/properties",
				},
				{
					title: "Unit Attributes",
					url: "/ap-admin/attributes/units",
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
					url: "/ap-admin/listings/properties",
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
	shared: [
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
