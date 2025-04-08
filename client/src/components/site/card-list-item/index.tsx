import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UnitType } from "@/utils/types";
import { Image, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import ImageLightbox from "../lightbox";
import { getCycleLabel, toCurrency } from "@/utils/helper";
import ConfirmModal from "../confirm-modal";

type CardListItemProps = {
	apartment: UnitType;
	onEdit?: (unit: UnitType) => void;
	onDelete?: (unit: string) => void;
	onChangeImage?: (unit: UnitType) => void;
};
// Apartment card component
export default function CardListItem({
	apartment,
	onEdit,
	onDelete,
	onChangeImage,
}: CardListItemProps) {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	return (
		<div className="relative overflow-hidden rounded-lg border bg-background shadow-none">
			<div className="flex flex-col sm:flex-row h-[150px]">
				<div
					className="w-full sm:w-1/3 md:w-[150px] cursor-pointer"
					onClick={() => setLightboxOpen(true)}>
					<img
						src={
							apartment?.images.length > 0
								? apartment.images[0].image
								: "/images/default/default.jpg"
						}
						alt={apartment.name}
						className="h-[150px] w-[150px] object-cover transition-transform hover:scale-105"
					/>
					<div className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
						{apartment?.images.length ?? 0} photos
					</div>
				</div>
				<div className="relative flex-1 p-4">
					<div className="absolute right-4 top-4 flex space-x-2">
						{onEdit && (
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => onEdit(apartment)}>
								<Pencil className="h-4 w-4" />
								<span className="sr-only">Edit</span>
							</Button>
						)}
						{onChangeImage && (
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={() => onChangeImage(apartment)}>
								<Image className="h-4 w-4" />
								<span className="sr-only">Change Photo</span>
							</Button>
						)}
						{onDelete && (
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-destructive"
								onClick={() => setConfirmDelete(true)}>
								<Trash2 className="h-4 w-4" />
								<span className="sr-only">Delete</span>
							</Button>
						)}
					</div>
					<h3 className="text-lg font-semibold">{apartment.name}</h3>
					<div className="mt-2 space-y-1">
						<p className="text-sm font-medium">
							Type: <TypeBadge type={apartment.type.name} />
						</p>
						<div className="flex gap-10 flex-wrap">
							<p className="text-sm font-medium">
								Rent:{" "}
								<span className="text-muted-foreground">
									{toCurrency(apartment.rentPrice)}
								</span>
							</p>
							<p className="text-sm font-medium">
								Cycle:
								<span className="text-muted-foreground">
									{` Every ${
										apartment.rentDuration
									} ${getCycleLabel({
										duration: apartment.rentDuration,
										cycle: apartment.rentCycle,
									})}`}
								</span>
							</p>
						</div>
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

			{apartment.images[0] && (
				<ImageLightbox
					images={apartment.images}
					isOpen={lightboxOpen}
					onClose={() => setLightboxOpen(false)}
				/>
			)}

			{onDelete && (
				<ConfirmModal
					title="Confirm Delete"
					onConfirm={() => onDelete(apartment.id)}
					onOpen={confirmDelete}
					setOpen={setConfirmDelete}>
					<p className="text-center">
						Are you sure you want to delete <b>{apartment.name}</b>?
					</p>
				</ConfirmModal>
			)}
		</div>
	);
}

const TypeBadge = ({ type }: { type: string }) => {
	return (
		<span className="text-sm text-muted-foreground capitalize">
			{type.toLowerCase()}
		</span>
	);
};
