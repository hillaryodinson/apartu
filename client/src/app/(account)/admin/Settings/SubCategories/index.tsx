import DataTable from "@/components/datatable/datatable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./components/columns";
import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, CategoryWithSubCategoryType } from "@/utils/types";
import api from "@/utils/api";
import { Modal } from "@/components/site/modal/modal";
import AddSubCategoryForm from "./components/AddSubCategoryForm";

const ApSubCategoriesPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();

	const onAdd = () => {};
	const onEdit = () => {};
	const onDelete = () => {};
	const columns = useMemo(() => getColumns({ onAdd, onEdit, onDelete }), []);

	const params = useParams();

	const { data: category } = useQuery({
		queryKey: ["fetch_sub_cat", params.categoryId],
		queryFn: async () => {
			const response = await api.get(`/category/${params.categoryId}`);
			const result =
				(await response.data) as ApiResponse<CategoryWithSubCategoryType>;

			return result.data;
		},
	});

	return (
		<div>
			<Helmet>
				<title>SubCategory | Setting | Apartu</title>
			</Helmet>
			<DashboardPageHeader title={category?.name ?? "Category"} />
			<div className="grid auto-rows-min gap-4 md:grid-cols-1">
				<Card className="shadow-none rounded-none">
					<CardHeader className="flex items-end">
						<div className="gap-2 flex">
							<Button
								className="!rounded-lg"
								size={"sm"}
								variant={"outline"}
								onClick={() => navigate(-1)}>
								<ChevronLeft /> Back
							</Button>
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
							data={category?.subCategory ?? []}
							emptyText="Sub Category is currently empty."
						/>
					</CardContent>
				</Card>
			</div>
			{category && (
				<Modal
					title="Add Sub Category"
					open={openModal}
					setOpen={setOpenModal}>
					<AddSubCategoryForm
						categoryId={category.id}
						onSuccessFn={() => setOpenModal(false)}
					/>
				</Modal>
			)}
		</div>
	);
};

export default ApSubCategoriesPage;
