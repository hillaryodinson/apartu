import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DashboardPageHeader from "@/components/site/dashboard-page-header";

const DashboardPage = () => {
	return (
		<>
			<DashboardPageHeader title="Dashboard" />
			<div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<div className="">
						<Card className="shadow-none">
							<CardHeader>
								<CardTitle>Card Title</CardTitle>
								<CardDescription>
									Card Description
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p>Card Content</p>
							</CardContent>
							<CardFooter>
								<p>Card Footer</p>
							</CardFooter>
						</Card>
					</div>
					<div className="aspect-video rounded-xl bg-muted/50" />
					<div className="aspect-video rounded-xl bg-muted/50" />
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
			</div>
		</>
	);
};

export default DashboardPage;
