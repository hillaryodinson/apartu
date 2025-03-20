import { Helmet } from "react-helmet";
import AboutSection from "../../components/site/about";
import HeroSection from "../../components/site/hero";
import ListingCategorySection from "../../components/site/listing-category";
import ListingPropertySection from "../../components/site/listing-property";
// import { useQuery } from "@tanstack/react-query";

const Properties = [
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

const HomePage = () => {
	// const query = useQuery({
	// 	queryKey: ["fetch_properties"],
	// 	queryFn: () => {},
	// 	refetchInterval: 3600,
	// });
	return (
		<>
			<Helmet>
				<title>Home | Apartu</title>
			</Helmet>
			<HeroSection />
			<AboutSection />
			<section className="relative md:py-24 py-16">
				<ListingCategorySection />
			</section>
			<div className="container relative lg:mt-24 mt-16">
				<div className="grid grid-cols-1 pb-8 text-center">
					<h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
						Featured Properties
					</h3>

					<p className="text-slate-400 max-w-xl mx-auto">
						A great plateform to buy, sell and rent your properties
						without any agent or commisions.
					</p>
				</div>
				<ListingPropertySection properties={Properties} />

				<div className="md:flex justify-center text-center mt-6">
					<div className="md:w-full">
						<a
							href="list.html"
							className="btn btn-link text-green-600 hover:text-green-600 after:bg-green-600 transition duration-500">
							View More Properties
							<i className="uil uil-arrow-right ms-1"></i>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
