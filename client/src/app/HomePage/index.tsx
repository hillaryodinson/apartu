import { Helmet } from "react-helmet";
import AboutSection from "../../components/site/about";
import HeroSection from "../../components/site/hero";
import ListingCategorySection from "../../components/site/listing-category";
import ListingPropertySection from "../../components/site/listing-property";

const HomePage = () => {
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
				<ListingPropertySection />

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
