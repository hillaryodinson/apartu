import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageType } from "@/utils/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Lightbox component
interface ImageLightboxProps {
	images: ImageType[];
	isOpen: boolean;
	onClose: () => void;
	initialIndex?: number;
}
export default function ImageLightbox({
	images,
	isOpen,
	onClose,
	initialIndex = 0,
}: ImageLightboxProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: { key: string }) => {
		if (e.key === "ArrowLeft") {
			handlePrevious();
		} else if (e.key === "ArrowRight") {
			handleNext();
		} else if (e.key === "Escape") {
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className="max-w-4xl p-0 overflow-hidden"
				onKeyDown={handleKeyDown}
				onInteractOutside={onClose}>
				<div className="relative flex h-full w-full flex-col">
					<div className="absolute right-4 top-4 z-10 flex gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
							onClick={onClose}>
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</Button>
					</div>

					<div className="relative aspect-video w-full overflow-hidden">
						<img
							src={
								images[currentIndex].image || "/placeholder.svg"
							}
							alt={`Apartment image ${currentIndex + 1}`}
							className="h-full w-full object-cover"
						/>

						<Button
							variant="outline"
							size="icon"
							className="absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
							onClick={handlePrevious}>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous image</span>
						</Button>

						<Button
							variant="outline"
							size="icon"
							className="absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
							onClick={handleNext}>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Next image</span>
						</Button>

						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
							{currentIndex + 1} / {images.length}
						</div>
					</div>

					<div className="flex gap-2 overflow-x-auto p-4">
						{images.map((image, index) => (
							<button
								key={index}
								className={`relative flex-shrink-0 overflow-hidden rounded-md ${
									currentIndex === index
										? "ring-2 ring-primary"
										: ""
								}`}
								onClick={() => setCurrentIndex(index)}>
								<img
									src={image.image || "/placeholder.svg"}
									alt={`Thumbnail ${index + 1}`}
									className="h-16 w-16 object-cover"
								/>
							</button>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
