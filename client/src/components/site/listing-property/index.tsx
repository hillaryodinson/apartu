import React from "react";
import ListingPropertyItem, {
	ListingPropertyItemProps,
} from "../listing-property-item";
const Properties: ListingPropertyItemProps[] = [
	{
		imageSrc: "/images/property/5.jpg",
		location: "No. 25, Olumide Street, Ikeja Lagos State, Nigeria",
		price: 120311,
		ratings: 4.5,
		totalReviews: 5,
	},
	{
		imageSrc: "/images/property/6.jpg",
		location:
			"Plot 72, Adamu Gwandu Crescent Abuja, Federal Capital Territory, Nigeria",
		price: 4501000,
		ratings: 4.0,
		totalReviews: 25,
	},
	{
		imageSrc: "/images/property/7.jpg",
		location: "7B Olorunshogo Road, Alagbole Ikeja, Lagos, Nigeria",
		price: 4501000,
		ratings: 3.5,
		totalReviews: 25,
	},
	{
		imageSrc: "/images/property/8.jpg",
		location: "10, Obafemi Awolowo Road Ibadan, Oyo State, Nigeria",
		price: 4501000,
		ratings: 0.0,
		totalReviews: 25,
	},
];

const ListingPropertySection = () => {
	return (
		<div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px] mt-8">
			{Properties &&
				Properties.map((property) => (
					<ListingPropertyItem
						imageSrc={property.imageSrc}
						location={property.location}
						price={property.price}
						ratings={property.ratings}
						totalReviews={property.totalReviews}
					/>
				))}
		</div>
	);
};

export default ListingPropertySection;
