import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ApiResponse, PropertyType } from "@/utils/types";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { redirect, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePropertyStore } from "@/store/property-store";
import { Skeleton } from "@/components/ui/skeleton";
import CardListItem from "@/components/site/card-list-item";
import api from "@/utils/api";
import PropertyOverview from "@/components/site/property-overview";

const MyPropertyDetailsPage = () => {
	const { propertyId } = useParams();
	const propertyStore = usePropertyStore((state) => state);
	const [property, setProperty] = useState<PropertyType | null>(
		propertyStore.selectedProperty
	);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProperty = async () => {
			if (property == null && propertyStore.selectedProperty == null) {
				try {
					const response = await api.get(`/property/${propertyId}`);
					const result =
						(await response.data) as ApiResponse<PropertyType>;
					propertyStore.setSelectedProperty(result.data!);
					setProperty(result.data!);
				} catch (error) {
					console.error(error);
					redirect("/dashboard/properties");
				}
			} else {
				setProperty(propertyStore.selectedProperty);
			}
		};

		fetchProperty();
	}, [property, propertyId, propertyStore]);

	return (
		<>
			<Helmet>
				<title>{property?.name ?? " "} | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="My Properties" />
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
								<Button
									className="!rounded-lg bg-slate-900"
									size={"sm"}>
									<PlusCircle /> Add Unit
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							{property && (
								<PropertyOverview property={property!} />
							)}

							{property?.units && (
								<h2 className="text-2xl font-bold"> Units </h2>
							)}
							{property ? (
								<div className="grid gap-4">
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

export default MyPropertyDetailsPage;
