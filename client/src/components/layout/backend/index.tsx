import "@/index.css";
import { Outlet } from "react-router-dom";
import "../../../app-backend.css";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import NotificationTag from "@/components/site/notification-tag";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const BackendLayout = () => {
	return (
		<SidebarProvider>
			<AppSidebar className="!bg-white" />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
					</div>
					<div className="ml-auto px-3">
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 rounded-full">
							<Bell />
							{/* <BellDot className="text-green-800" /> */}
						</Button>
					</div>
				</header>
				<NotificationTag message="Welcome to Apartu property service" />
				<div className="flex flex-1 flex-col p-4 pt-0 bg-muted/50">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default BackendLayout;
