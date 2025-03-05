import { MapPin } from "lucide-react";

export type PropertyFeatureProps = {
	icon: string;
	value: string;
};

export type PropertyDetailInfoProps = {
	address: string;
	name: string;
	features: PropertyFeatureProps[];
};

const PropertyDetailInfo = ({
	children,
	name,
	address,
	features,
}: {
	children: React.ReactNode;
} & PropertyDetailInfoProps) => {
	return (
		<>
			<h4 className="text-2xl font-medium mt-6 mb-3">{name}</h4>
			<span className="text-slate-400 flex items-center">
				<MapPin />
				{address}
			</span>
			<ul className="py-6 flex items-center list-none">
				{features &&
					features.map((feature) => (
						<li className="flex items-center lg:me-6 me-4">
							<i
								className={`uil ${feature.icon} lg:text-3xl text-2xl me-2 text-green-600`}></i>
							<span className="lg:text-xl">{feature.value}</span>
						</li>
					))}
			</ul>
			{children}
		</>
	);
};

export default PropertyDetailInfo;
