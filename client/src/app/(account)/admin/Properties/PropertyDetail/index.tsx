import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ApiResponse, PropertyType } from "@/utils/types";
import { ChevronLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import CardListItem from "@/components/site/card-list-item";
import api from "@/utils/api";
import PropertyOverview from "@/components/site/property-overview";

import { useQuery } from "@tanstack/react-query";

const ApPropertyDetailsPage = () => {
	const { propertyId } = useParams();

	const navigate = useNavigate();
	const { data: property } = useQuery({
		queryKey: ["property_overview", propertyId],
		queryFn: async () => {
			const response = await api.get(
				`/property/${propertyId}?withOwner=true&withCategory=true`
			);
			const result = (await response.data) as ApiResponse<PropertyType>;
			return result.data;
		},
	});

	return (
		<>
			<Helmet>
				<title>{property?.name ?? " "} | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="Properties" />
			<div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-1">
					<Card className="shadow-none rounded-none">
						<CardHeader className="flex items-end">
							<div className="gap-2 flex">
								<Button
									className="!rounded-lg"
									size={"sm"}
									variant={"outline"}
									onClick={() => navigate(-1)}>
									<ChevronLeft /> Back
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							{property && (
								<PropertyOverview property={property} />
							)}

							{property?.units && (
								<h2 className="text-2xl font-bold"> Units </h2>
							)}
							{property ? (
								<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
									{property.units.map((apartment) => (
										<CardListItem
											key={apartment.id}
											apartment={apartment}
										/>
									))}
								</div>
							) : (
								<Skeleton />
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ApPropertyDetailsPage;
