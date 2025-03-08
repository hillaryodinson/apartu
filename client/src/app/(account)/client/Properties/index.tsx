import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { getColumns } from "./components/columns";
import { PropertyType } from "@/utils/types";
import DataTable from "@/components/datatable/datatable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Modal } from "@/components/site/modal/modal";
import { useQuery } from "@tanstack/react-query";
import { fetchMyProperties } from "./action";
import AddPropertyForm from "./components/AddPropertyForm";
import AddUnitForm from "./components/AddUnitForm";

const MyPropertiesPage = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openModal1, setOpenModal1] = useState<boolean>(false);

	const columns = useMemo(
		() =>
			getColumns({
				onView: (data: PropertyType) => {
					console.log(data);
				},
			}),
		[]
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
									onClick={() => setOpenModal1(true)}>
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
			<Modal title="Add Property" open={openModal} setOpen={setOpenModal}>
				<AddPropertyForm />
			</Modal>

			<Modal
				title="Property Listing Details"
				open={openModal1}
				setOpen={setOpenModal1}>
				<AddUnitForm />
			</Modal>
		</>
	);
};

export default MyPropertiesPage;
