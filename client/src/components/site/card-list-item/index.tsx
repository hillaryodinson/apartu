import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UnitType } from "@/utils/types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import ImageLightbox from "../lightbox";

// Apartment card component
export default function CardListItem({ apartment }: { apartment: UnitType }) {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	console.log(apartment);

	return (
		<div className="relative overflow-hidden rounded-lg border bg-background shadow-sm">
			<div className="flex flex-col sm:flex-row">
				<div
					className="w-full sm:w-1/3 md:w-1/4 cursor-pointer"
					onClick={() => setLightboxOpen(true)}>
					<img
						src={
							(apartment.images && apartment.images[0].image) ||
							"/placeholder.svg"
						}
						alt={apartment.name}
						className="h-full w-full object-cover transition-transform hover:scale-105"
					/>
					<div className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
						{apartment.images.length} photos
					</div>
				</div>
				<div className="relative flex-1 p-4">
					<div className="absolute right-4 top-4 flex space-x-2">
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<Pencil className="h-4 w-4" />
							<span className="sr-only">Edit</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-destructive">
							<Trash2 className="h-4 w-4" />
							<span className="sr-only">Delete</span>
						</Button>
					</div>
					<h3 className="text-lg font-semibold">{apartment.name}</h3>
					<div className="mt-2 space-y-1">
						<p className="text-sm text-muted-foreground">
							Type: {apartment.type}
						</p>
						<p className="text-sm font-medium">
							{apartment.rentPrice} / {apartment.rentDuration}
						</p>
						<div className="mt-2">
							<Badge
								variant={
									apartment.availability.toLowerCase() ===
									"available"
										? "default"
										: apartment.availability.toLowerCase() ===
										  "Rented"
										? "secondary"
										: "outline"
								}
								className="capitalize">
								{apartment.availability.toLowerCase()}
							</Badge>
						</div>
					</div>
				</div>
			</div>

			<ImageLightbox
				images={apartment.images}
				isOpen={lightboxOpen}
				onClose={() => setLightboxOpen(false)}
			/>
		</div>
	);
}
