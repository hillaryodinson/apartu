import DashboardPageHeader from "@/components/site/dashboard-page-header";
import DashCard from "@/components/site/dashcard";
import { Flag, House, UsersRoundIcon } from "lucide-react";
import { Helmet } from "react-helmet";

const DashboardPage = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="Dashboard" />
			<div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<DashCard
						title="Apartments"
						value={0}
						icon={House}
						color="green"
						detail="Total Apartments"
						trend={"stable"}
					/>
					<DashCard
						title="Tenants"
						value={0}
						icon={UsersRoundIcon}
						color="blue"
						detail="All Tenants"
						trend={"stable"}
					/>
					<DashCard
						title="Complaints"
						value={0}
						icon={Flag}
						color="slate"
						detail="Tenant Complaints"
						trend={"stable"}
					/>
				</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
			</div>
		</>
	);
};

export default DashboardPage;
