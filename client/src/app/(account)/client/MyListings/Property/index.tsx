import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { getColumns } from "./components/columns";
import { PropertyType } from "@/utils/types";
import DataTable from "@/components/datatable/datatable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMyProperties } from "./action";
import { useNavigate } from "react-router-dom";
import { usePropertyStore } from "@/store/property-store";
import { PropertyModal } from "./components/PropertyModal";

const MyPropertiesPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const setSelectedProperty = usePropertyStore(
		(state) => state.setSelectedProperty
	);
	const navigate = useNavigate();

	const columns = useMemo(
		() =>
			getColumns({
				onView: (data: PropertyType) => {
					console.log(data);
					setSelectedProperty(data);
					navigate(`/my-listings/properties/${data.id}`);
				},
				onDelete: (data: PropertyType) => {
					console.log(data);
				},
				onAddUnit: (data: PropertyType) => {
					console.log(data);
				},
				onEdit: (data: PropertyType) => {
					console.log(data);
				},
			}),
		[navigate, setSelectedProperty]
	);

	const query = useQuery({
		queryKey: ["fetch_my_properties"],
		queryFn: fetchMyProperties,
	});

	return (
		<>
			<Helmet>
				<title>My Properties | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="My Properties" />
			<div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-1">
					<Card className="shadow-none rounded-none">
						<CardHeader className="flex items-end">
							<div>
								<Button
									className="!rounded-lg bg-slate-900"
									size={"sm"}
									onClick={() => setOpenModal(true)}>
									<PlusCircle /> Add Property
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<DataTable
								columns={columns}
								data={query.data ?? []}
								emptyText="Property is currently empty."
							/>
						</CardContent>
					</Card>
				</div>
			</div>
			<PropertyModal open={openModal} setOpen={setOpenModal} />
		</>
	);
};

export default MyPropertiesPage;
