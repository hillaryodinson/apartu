import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { SwiperRef, Swiper, SwiperSlide } from "swiper/react";

const Slides = ({ slides }: { slides: string[] }) => {
	const swiperRef = useRef<SwiperRef | null>(null);
	// Custom navigation functions
	const goToPrev = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	const goToNext = () => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideNext();
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 relative">
				<div className="tns-outer" id="tns1-ow">
					<div
						className="tns-controls"
						aria-label="Carousel Navigation"
						tabIndex={0}>
						<button
							type="button"
							data-controls="prev"
							tabIndex={-1}
							aria-controls="tns1"
							className="flex flex-column items-center justify-center"
							onClick={goToPrev}>
							<ChevronLeft height={18} width={18} />
						</button>
						<button
							type="button"
							data-controls="next"
							tabIndex={-1}
							aria-controls="tns1"
							className="flex flex-column items-center justify-center"
							onClick={goToNext}>
							<ChevronRight height={18} width={18} />
						</button>
					</div>

					<Swiper
						spaceBetween={50}
						slidesPerView={1}
						autoplay={true}
						loop={true}
						ref={swiperRef}>
						{slides.map((slide, index) => (
							<SwiperSlide>
								<img
									src={slide}
									alt={`slide ${index}`}
									className="rounded-md shadow-sm dark:shadow-gray-700"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
};

export default Slides;
