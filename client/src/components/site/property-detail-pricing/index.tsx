import { Link } from "react-router-dom";
import { toCurrency } from "../../../utils/helper";

export type PropertyDetailPricingProps = {
	cost: number;
	status: string;
	daysOnMarket: number;
	type: "rent" | "l";
};

const PropertyDetailPricing = ({
	cost,
	status = "For Sale",
	daysOnMarket = 1,
}: PropertyDetailPricingProps) => {
	return (
		<div className="sticky top-20">
			<div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-700">
				<div className="p-6">
					<h5 className="text-2xl font-medium">Price:</h5>

					<div className="flex justify-between items-center mt-4">
						<span className="text-xl font-medium">
							{toCurrency(cost)}
						</span>

						<span className="bg-green-600/10 text-green-600 text-sm px-2.5 py-0.75 rounded h-6">
							{status}
						</span>
					</div>

					<ul className="list-none mt-4">
						<li className="flex justify-between items-center">
							<span className="text-slate-400 text-sm">
								Days on Apartu
							</span>
							<span className="font-medium text-sm">
								{daysOnMarket} Days
							</span>
						</li>

						<li className="flex justify-between items-center mt-2">
							<span className="text-slate-400 text-sm">
								Price per sq ft
							</span>
							<span className="font-medium text-sm">$ 186</span>
						</li>

						<li className="flex justify-between items-center mt-2">
							<span className="text-slate-400 text-sm">
								Monthly Payment (estimate)
							</span>
							<span className="font-medium text-sm">
								$ 1497/Monthly
							</span>
						</li>
					</ul>
				</div>

				<div className="flex">
					<div className="p-1 w-1/2">
						<Link
							to=""
							className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
							Book Now
						</Link>
					</div>
					<div className="p-1 w-1/2">
						<Link
							to=""
							className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
							Offer Now
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-12 text-center">
				<h3 className="mb-6 text-xl leading-normal font-medium text-slate-900 dark:text-white">
					Have Question ? Get in touch!
				</h3>

				<div className="mt-6">
					<Link
						to="contact.html"
						className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md">
						<i className="uil uil-phone align-middle me-2"></i>{" "}
						Contact us
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetailPricing;
