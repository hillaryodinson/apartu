import { Helmet } from "react-helmet";
import PropertyDetailInfo from "../../components/site/property-detail-info";
import PropertyDetailPricing from "../../components/site/property-detail-pricing";
import Slides from "../../components/site/slide";

const PropertyDetails = () => {
	const demo = {
		name: "FLAX ESTATE & HOMES",
		address: "No. 25, Olumide Street, Ikeja Lagos State, Nigeria",
		features: [],
	};

	const demoGallery = [
		"/images/slides/1.jpg",
		"/images/slides/2.jpg",
		"/images/slides/3.jpg",
		"/images/slides/4.jpg",
		"/images/slides/5.jpg",
	];
	return (
		<>
			<Helmet>
				<title>Property Details | Apartu</title>
			</Helmet>
			<section className="relative md:py-24 pt-24 pb-16">
				<div className="container relative">
					<div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
						<div className="lg:col-span-8 md:col-span-7">
							<Slides slides={demoGallery} />
							<PropertyDetailInfo
								name={demo.name}
								address={demo.address}
								features={[]}>
								<p className="text-slate-400">
									Sed ut perspiciatis unde omnis iste natus
									error sit voluptatem accusantium doloremque
									laudantium, totam rem aperiam, eaque ipsa
									quae ab illo inventore veritatis et quasi
									architecto beatae vitae dicta sunt
									explicabo. Nemo enim ipsam voluptatem quia
									voluptas sit aspernatur aut odit aut fugit,
									sed quia consequuntur magni dolores eos qui
									ratione voluptatem sequi nesciunt.
								</p>
								<div className="w-full leading-[0] border-0 mt-6">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
										style={{ border: 0 }}
										className="w-full h-[500px]"></iframe>
								</div>
							</PropertyDetailInfo>
						</div>
						<div className="lg:col-span-4 md:col-span-5">
							<PropertyDetailPricing
								cost={10000}
								status={"For Rent"}
								daysOnMarket={2}
								type="rent"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default PropertyDetails;
