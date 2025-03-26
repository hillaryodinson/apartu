import DataTable from "@/components/datatable/datatable";
import ConfirmModal from "@/components/site/confirm-modal";
import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Modal } from "@/components/site/modal/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { getColumns } from "./components/columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAttribute, fetchAttributes } from "./action";
import { AttributeType } from "@/utils/types";
import AddAttributeForm from "./components/AddAttributeForm";
import { toast } from "react-toastify";

const ApAttributes = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
	const [attribute, setAttribute] = useState<AttributeType | undefined>(
		undefined
	);
	const queryClient = useQueryClient();

	const onEdit = (value: AttributeType) => {
		setAttribute(value);
		setOpenEditModal(true);
	};
	const deleteAttributeMutation = useMutation({
		mutationFn: deleteAttribute,
		onSuccess: () => {
			toast.success("Attribute was deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["fetch_attributes"],
			});
		},
		onError: () => {
			toast.error("An error occured attribute not deleted");
		},
		onSettled: () => {
			setOpenConfirmDialog(false);
		},
	});

	const onDelete = () => {};
	const columns = useMemo(() => getColumns({ onEdit, onDelete }), []);

	const { data: attributes } = useQuery({
		queryKey: ["fetch_attributes"],
		queryFn: fetchAttributes,
	});

	const doDelete = (id: string) => {
		deleteAttributeMutation.mutate(id);
	};

	return (
		<div>
			<Helmet>
				<title>Attributes | Setting | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="Attributes" />
			<div className="grid auto-rows-min gap-4 md:grid-cols-1">
				<Card className="shadow-none rounded-none">
					<CardHeader className="flex items-end">
						<div>
							<Button
								className="!rounded-lg bg-slate-900"
								size={"sm"}
								onClick={() => setOpenModal(true)}>
								<PlusCircle /> Add Attribute
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<DataTable
							columns={columns}
							data={attributes ?? []}
							emptyText="Category is currently empty."
						/>
					</CardContent>
				</Card>
			</div>
			<Modal
				title="Add Attribute"
				open={openModal}
				setOpen={setOpenModal}>
				<AddAttributeForm onSuccessFn={() => setOpenModal(false)} />
			</Modal>
			<Modal
				title="Update Category"
				open={openEditModal}
				setOpen={setOpenEditModal}>
				<AddAttributeForm
					onSuccessFn={() => setOpenEditModal(false)}
					value={attribute}
				/>
			</Modal>
			{attribute && (
				<ConfirmModal
					title="Delete Category"
					onConfirm={() => doDelete(attribute.id!)}
					onOpen={openConfirmDialog}
					setOpen={setOpenConfirmDialog}>
					<p>
						Are you sure you want to delete <b>{attribute?.name}</b>
						?
					</p>
				</ConfirmModal>
			)}
		</div>
	);
};

export default ApAttributes;
