import DataTable from "@/components/datatable/datatable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./components/columns";
import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Helmet } from "react-helmet";

const ApSubCategoriesPage = () => {
	const [openModal, setOpenModal] = useState(false);

	const onAdd = () => {};
	const onEdit = () => {};
	const onDelete = () => {};
	const columns = useMemo(() => getColumns({ onAdd, onEdit, onDelete }), []);
	return (
		<div>
			<Helmet>
				<title>SubCategory | Setting | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="Categories" />
			<div className="grid auto-rows-min gap-4 md:grid-cols-1">
				<Card className="shadow-none rounded-none">
					<CardHeader className="flex items-end">
						<div>
							<Button
								className="!rounded-lg bg-slate-900"
								size={"sm"}
								onClick={() => setOpenModal(true)}>
								<PlusCircle /> Add Sub Category
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<DataTable
							columns={columns}
							data={[]}
							emptyText="Sub Category is currently empty."
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ApSubCategoriesPage;
