import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CirclePlus, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubCategoryType } from "@/utils/types";
import { Link } from "react-router-dom";

interface ColumnProps {
	onAdd?: (id: SubCategoryType) => void;
	onEdit?: (id: SubCategoryType) => void;
	onDelete?: (id: SubCategoryType) => void;
}

export const getColumns = ({
	onAdd,
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<SubCategoryType>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 100,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as SubCategoryType;
			return (
				<div className="font-medium">
					<Link to="/">{currentMember.name}</Link>
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Category Name" />
		),
	},

	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original as SubCategoryType;
			return onAdd || onEdit || onDelete ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="rounded-full">
							<EllipsisVertical className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{onAdd && (
							<DropdownMenuItem
								onClick={() => {
									if (onAdd) {
										onAdd(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<CirclePlus className="h-4 w-4 mr-2" />
								<span>Add Unit</span>
							</DropdownMenuItem>
						)}
						{onEdit && (
							<DropdownMenuItem
								onClick={() => {
									if (onEdit) {
										onEdit(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<Pencil className="h-4 w-4 mr-2" />
								<span>Edit</span>
							</DropdownMenuItem>
						)}
						{onDelete && (
							<DropdownMenuItem
								onClick={() => {
									if (onDelete) {
										onDelete(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<Trash className="h-4 w-4 mr-2" />
								<span>Delete</span>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			) : null;
		},
	},
];
