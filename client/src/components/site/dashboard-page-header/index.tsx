import React, { JSX } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";

interface Location {
	pathname: string;
}

const generateBreadcrumbs = (location: Location): JSX.Element => {
	console.log(
		location.pathname,
		location.pathname.replace(/\/(ll|tn|ct|ap-admin)\//g, "/")
	);
	const pathnames = location.pathname
		.replace(/\/(ll|tn|ct|ap-admin)\//g, "/")
		.split("/")
		.filter((x) => x && !x.match(/^\d+$/) && !x.includes("?"));

	const routePathnames = location.pathname
		.split("/")
		.filter((x) => x && !x.match(/^\d+$/) && !x.includes("?"));

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="#">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{pathnames.map((value, index) => {
					const to = `/${routePathnames
						.slice(0, index + 2)
						.join("/")}`;
					return (
						<React.Fragment key={to}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink
									href={to}
									className="capitalize">
									{value}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

const DashboardPageHeader = ({ title }: { title: string }) => {
	const location = useLocation();
	return (
		<>
			<div className="flex justify-between pt-4 pb-1">
				<h3>{title}</h3>
				{generateBreadcrumbs(location)}
			</div>
			<Separator orientation={"horizontal"} className="mb-6" />
		</>
	);
};

export default DashboardPageHeader;
