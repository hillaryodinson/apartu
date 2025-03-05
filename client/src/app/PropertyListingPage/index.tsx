import React from "react";
import PageHeader from "../../components/site/page-header";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ListingPropertySection from "../../components/site/listing-property";
import { Helmet } from "react-helmet";

const PropertyListingPage = () => {
	return (
		<>
			<Helmet>
				<title>Property Listing | Apartu</title>
			</Helmet>
			<PageHeader title="Property Listing" />

			<div className="relative">
				<div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
					<svg
						viewBox="0 0 2880 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
							fill="currentColor"></path>
					</svg>
				</div>
			</div>

			<section className="relative lg:py-24 py-16">
				<div className="container relative">
					<ListingPropertySection />

					<div className="grid md:grid-cols-12 grid-cols-1 mt-8">
						<div className="md:col-span-12 text-center">
							<nav>
								<ul className="inline-flex items-center -space-x-px">
									<li>
										<a
											href="#"
											className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">
											<ArrowLeft width={18} height={18} />
										</a>
									</li>
									<li>
										<a
											href="#"
											className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">
											1
										</a>
									</li>
									<li>
										<a
											href="#"
											className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">
											2
										</a>
									</li>
									<li>
										<a
											href="#"
											aria-current="page"
											className="z-10 size-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-green-600 shadow-xs dark:shadow-gray-700">
											3
										</a>
									</li>
									<li>
										<a
											href="#"
											className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">
											4
										</a>
									</li>
									<li>
										<a
											href="#"
											className="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">
											<ArrowRight
												width={18}
												height={18}
											/>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default PropertyListingPage;
