import DataTable from "@/components/datatable/datatable";
import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Card, CardContent } from "@/components/ui/card";
import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { getColumns } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import { fetchProperties } from "./action";

const ApPropertiesPage = () => {
	const columns = useMemo(() => getColumns(), []);
	const { data: properties } = useQuery({
		queryKey: ["fetch_properties"],
		queryFn: fetchProperties,
	});
	return (
		<>
			<Helmet>
				<title> Properties | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="Properties" />
			<div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-1">
					<Card className="shadow-none rounded-none">
						<CardContent>
							<DataTable
								columns={columns}
								data={properties ?? []}
								emptyText="Property is currently empty."
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ApPropertiesPage;
