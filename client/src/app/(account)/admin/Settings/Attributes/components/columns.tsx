import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttributeType } from "@/utils/types";
import { Link } from "react-router-dom";

interface ColumnProps {
	onEdit?: (id: AttributeType) => void;
	onDelete?: (id: AttributeType) => void;
}

export const getColumns = ({
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<AttributeType>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 100,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as AttributeType;
			return (
				<div className="font-medium">
					<Link
						to={`/ap-admin/category/${currentMember.id}/sub-categories`}>
						{currentMember.name}
					</Link>
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Attribute Name" />
		),
	},

	{
		accessorKey: "type",
		cell: ({ row }) => {
			const currentMember = row.original as AttributeType;
			return <div className="font-medium">{currentMember.type}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Attribute Type" />
		),
	},

	{
		accessorKey: "valueTyped",
		cell: ({ row }) => {
			const currentMember = row.original as AttributeType;
			return <div className="font-medium">{currentMember.valueType}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Value Type" />
		),
	},

	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original as AttributeType;
			return onEdit || onDelete ? (
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
