import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyType } from "@/utils/types";
import { Blocks, Building, MapPin } from "lucide-react";
import ProfileCard from "../user-profile-card";
import { Badge } from "@/components/ui/badge";

export default function PropertyOverview({
	property,
}: {
	property: PropertyType;
}) {
	const units = property?.units || [];
	const totalOccupiedUnits = units.filter(
		(unit) => unit.availability.toLowerCase() === "rented"
	).length;
	const totalAvailableUnits = units.filter(
		(unit) => unit.availability.toLowerCase() === "available"
	).length;
	const totalMaintenanceUnits =
		units.length - (totalAvailableUnits + totalOccupiedUnits);
	const occupancyRate =
		totalOccupiedUnits > 0 && units.length > 0
			? ((totalOccupiedUnits / units.length) * 100).toFixed(2)
			: 0;

	return (
		<div className="mb-8">
			<div className="mb-4 flex">
				<div className="details flex-1 flex flex-col align-center">
					<h2 className="text-lg font-bold">{property.name ?? ""}</h2>
					{property.category && (
						<div className="flex items-center gap-2 mt-1 text-muted-foreground">
							<Building className="h-4 w-4" />
							<span>{property.category.name}</span>
						</div>
					)}
					<div className="flex items-center gap-2 mt-1 text-muted-foreground">
						<MapPin className="h-4 w-4" />
						<span>{property.address}</span>
					</div>
					<div className="flex items-center gap-2 mt-1 text-muted-foreground">
						<Blocks className="h-4 w-4" />
						Rental Type:{" "}
						<Badge variant={"outline"}>{property.rentalType}</Badge>
					</div>
				</div>
				{property.owner && (
					<div className="owner_profile flex-1 flex flex-col align-right">
						<ProfileCard owner={property.owner!} />
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Total Units
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{units.length}</div>
						<p className="text-xs text-muted-foreground mt-1">
							Property capacity
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Available Units
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalAvailableUnits}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Ready for occupancy
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Occupied Units
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{totalOccupiedUnits}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Currently rented
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Occupancy Rate
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{occupancyRate}%
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{totalMaintenanceUnits} units in maintenance
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
