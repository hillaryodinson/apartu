import DataTable from "@/components/datatable/datatable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./components/columns";
import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Helmet } from "react-helmet";
import { Modal } from "@/components/site/modal/modal";
import AddCategoryForm from "./components/AddCategoryForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, fetchCategories } from "./action";
import { CategoryType } from "@/utils/types";
import ConfirmModal from "@/components/site/confirm-modal";
import { toast } from "react-toastify";

const ApCategoriesPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
	const [category, setCategory] = useState<CategoryType | undefined>(
		undefined
	);
	const queryClient = useQueryClient();

	const onEdit = (data: CategoryType) => {
		setCategory(data);
		setOpenEditModal(true);
	};

	const deleteCategoryMutation = useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			toast.success("Category was deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["fetch_categories"],
			});
		},
		onError: () => {
			toast.error("An error occured category not deleted");
		},
		onSettled: () => {
			setOpenConfirmDialog(false);
		},
	});

	const onDelete = (data: CategoryType) => {
		setCategory(data);
		setOpenConfirmDialog(true);
	};

	const doDelete = (id: string) => {
		deleteCategoryMutation.mutate(id);
	};

	const columns = useMemo(() => getColumns({ onEdit, onDelete }), []);
	const { data: categories } = useQuery({
		queryKey: ["fetch_categories"],
		queryFn: fetchCategories,
	});
	return (
		<div>
			<Helmet>
				<title>Category | Setting | Apartu</title>
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
								<PlusCircle /> Add Category
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<DataTable
							columns={columns}
							data={categories ?? []}
							emptyText="Category is currently empty."
						/>
					</CardContent>
				</Card>
			</div>
			<Modal title="Add Category" open={openModal} setOpen={setOpenModal}>
				<AddCategoryForm onSuccessFn={() => setOpenModal(false)} />
			</Modal>
			<Modal
				title="Update Category"
				open={openEditModal}
				setOpen={setOpenEditModal}>
				<AddCategoryForm
					onSuccessFn={() => setOpenEditModal(false)}
					value={category}
				/>
			</Modal>
			{category && (
				<ConfirmModal
					title="Delete Category"
					onConfirm={() => doDelete(category.id)}
					onOpen={openConfirmDialog}
					setOpen={setOpenConfirmDialog}>
					<p>
						Are you sure you want to delete <b>{category.name}</b>?
					</p>
				</ConfirmModal>
			)}
		</div>
	);
};

export default ApCategoriesPage;
