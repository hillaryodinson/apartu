import React from "react";
import ListingCategoryItem from "../listing-category-item";

type ListingCategory = {
	imageSrc: string;
	url: string;
	categoryName: string;
	count: number;
};
const Categories: ListingCategory[] = [
	{
		imageSrc: "/images/property/residential.jpg",
		url: "/",
		categoryName: "Residential",
		count: 0,
	},
	{
		imageSrc: "/images/property/land.jpg",
		url: "/",
		categoryName: "Land",
		count: 0,
	},
	{
		imageSrc: "/images/property/commercial.jpg",
		url: "/",
		categoryName: "Commercial",
		count: 0,
	},
	{
		imageSrc: "/images/property/investment.jpg",
		url: "/",
		categoryName: "Investment",
		count: 0,
	},
	{
		imageSrc: "/images/property/industrial.jpg",
		url: "/",
		categoryName: "Industrial",
		count: 0,
	},
];

const ListingCategorySection = () => {
	return (
		<div className="container relative">
			<div className="grid grid-cols-1 pb-8">
				<h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
					Listing Categories
				</h3>

				<p className="text-slate-400 max-w-xl">
					A great plateform to buy, sell and rent your properties
					without any agent or commisions.
				</p>
			</div>

			<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-8 md:gap-[30px] gap-3">
				{Categories.map((category) => (
					<ListingCategoryItem
						categoryName={category.categoryName}
						count={category.count}
						imageSrc={category.imageSrc}
						url={category.url}
					/>
				))}
			</div>
		</div>
	);
};

export default ListingCategorySection;
