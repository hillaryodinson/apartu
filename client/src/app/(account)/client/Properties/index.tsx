import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const MyPropertiesPage = () => {
	return (
		<>
			<Helmet>
				<title>My Properties | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="My Properties" />
			<div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-1">
					<Card className="shadow-none rounded-none">
						<CardContent>
							<p>Card Content</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default MyPropertiesPage;
