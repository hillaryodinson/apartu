import PropertyDetailInfo from "../../components/site/property-detail-info";

const PropertyDetails = () => {
	return (
		<section className="relative md:py-24 pt-24 pb-12">
			<div className="md:grid-12-cols grid-cols-1 grid gap-[30px]">
				<div className="lg:col-span-8 md:col-span-7">
					<PropertyDetailInfo name="" address="" features={[]}>
						<p>Hello world</p>
					</PropertyDetailInfo>
				</div>
			</div>
		</section>
	);
};

export default PropertyDetails;
