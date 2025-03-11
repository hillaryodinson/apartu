import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyType } from "@/utils/types";
import { Building, MapPin } from "lucide-react";

export default function PropertyOverview({
	property,
}: {
	property: PropertyType;
}) {
	console.log(property);
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
			<div className="mb-4">
				<h2 className="text-3xl font-bold">{property.name ?? ""}</h2>
				<div className="flex items-center gap-2 mt-1 text-muted-foreground">
					<Building className="h-4 w-4" />
					<span>{property.type}</span>
				</div>
				<div className="flex items-center gap-2 mt-1 text-muted-foreground">
					<MapPin className="h-4 w-4" />
					<span>{property.address}</span>
				</div>
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
