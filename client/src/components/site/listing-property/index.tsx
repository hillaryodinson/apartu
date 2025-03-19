import ListingPropertyItem, {
	ListingPropertyItemProps,
} from "../listing-property-item";

const ListingPropertySection = ({
	properties,
}: {
	properties: ListingPropertyItemProps[];
}) => {
	return (
		<div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px] mt-8">
			{properties &&
				properties.map((property) => (
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
