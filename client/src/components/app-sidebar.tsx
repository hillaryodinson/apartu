import * as React from "react";
import {
	BookOpen,
	Bot,
	Home,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
	User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/user-store";

// This is sample data.
const data = {
	site: {
		name: "Apartu Homes",
		logo: Home,
		plan: "Enterprise",
	},
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
					url: "/dashboard/properties",
				},
				{
					title: "Units",
					url: "#",
				},
			],
		},
		{
			title: "Tenants",
			url: "#",
			icon: BookOpen,
			items: [
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
	projects: [
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useUserStore((state) => state.user);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.site} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={{ ...user, avatar: "" }} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
