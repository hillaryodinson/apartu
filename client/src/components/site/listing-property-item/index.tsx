import React from "react";
import Rating from "../rating";
import { toCurrency } from "../../../utils/helper";
export type ListingPropertyItemProps = {
	imageSrc: string;
	location: string;
	price: number;
	ratings: number;
	totalReviews: number;
};
const ListingPropertyItem = ({
	imageSrc,
	location,
	price,
	ratings,
	totalReviews,
}: ListingPropertyItemProps) => {
	return (
		<div className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto">
			<div className="md:flex">
				<div className="relative md:shrink-0">
					<img
						className="size-full object-cover md:w-48"
						src={imageSrc}
						alt=""
					/>
					<div className="absolute top-4 end-4">
						<a
							href="javascript:void(0)"
							className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 !rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600">
							<i className="mdi mdi-heart text-[20px]"></i>
						</a>
					</div>
				</div>
				<div className="p-6 w-full">
					<div className="md:pb-4 pb-6">
						<a
							href="property-detail.html"
							className="text-lg hover:text-green-600 font-medium ease-in-out duration-500">
							{location}
						</a>
					</div>

					<ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
						<li className="flex items-center me-4">
							<i className="uil uil-compress-arrows text-2xl me-2 text-green-600"></i>
							<span>8000sqf</span>
						</li>

						<li className="flex items-center me-4">
							<i className="uil uil-bed-double text-2xl me-2 text-green-600"></i>
							<span>4 Beds</span>
						</li>

						<li className="flex items-center">
							<i className="uil uil-bath text-2xl me-2 text-green-600"></i>
							<span>4 Baths</span>
						</li>
					</ul>

					<ul className="md:pt-4 pt-6 flex justify-between items-center list-none">
						<li>
							<span className="text-slate-400">Price</span>
							<p className="text-lg font-medium">
								{toCurrency(price)}
							</p>
						</li>

						<li>
							<span className="text-slate-400">Rating</span>
							<Rating value={ratings} total={totalReviews} />
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ListingPropertyItem;
