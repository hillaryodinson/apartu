import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PropertyType } from "@/utils/types";
import { PlusCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePropertyStore } from "@/store/property-store";
import { Skeleton } from "@/components/ui/skeleton";
import CardListItem from "@/components/site/card-list-item";

const MyPropertyDetailsPage = () => {
	const { propertyId } = useParams();
	const propertyStore = usePropertyStore((state) => state);
	const [property, setProperty] = useState<PropertyType | null>(
		propertyStore.selectedProperty
	);

	useEffect(() => {
		const fetchProperty = async () => {
			if (!property && !propertyStore.selectedProperty) {
				try {
					const response = await fetch(
						`/api/properties/${propertyId}`
					);
					const data = await response.json();
					propertyStore.setSelectedProperty(data);
					setProperty(data);
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
							<div>
								<Button
									className="!rounded-lg bg-slate-900"
									size={"sm"}>
									<PlusCircle /> Add Unit
								</Button>
							</div>
						</CardHeader>
						<CardContent>
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
