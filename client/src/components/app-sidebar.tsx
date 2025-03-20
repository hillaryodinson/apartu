import * as React from "react";

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
import { Home } from "lucide-react";
import { RouteData } from "@/routes/route";
import { UserRole } from "@/utils/types";

const site = {
	name: "Apartu Homes",
	logo: Home,
	plan: "Enterprise",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const user = useUserStore((state) => state.user);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={site} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain
					items={RouteData[(user?.role as UserRole) || "shared"]}
				/>
				<NavProjects projects={RouteData.shared} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={{ ...user, avatar: "" }} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
