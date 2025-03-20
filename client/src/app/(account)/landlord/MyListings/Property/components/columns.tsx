import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CirclePlus, EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyType } from "@/utils/types";
import { Link } from "react-router-dom";

interface ColumnProps {
	onView?: (id: PropertyType) => void;
	onAddUnit?: (id: PropertyType) => void;
	onEdit?: (id: PropertyType) => void;
	onDelete?: (id: PropertyType) => void;
}

export const getColumns = ({
	onView,
	onAddUnit,
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<PropertyType>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 100,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as PropertyType;
			return (
				<div className="font-medium">
					<Link
						to="#"
						onClick={() => onView && onView(currentMember)}>
						{currentMember.name}
					</Link>
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Property" />
		),
	},
	{
		accessorKey: "country",
		cell: ({ row }) => {
			const currentMember = row.original as PropertyType;
			return (
				<div className="text-xs text-muted-foreground">
					{currentMember.address}
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Address" />
		),
	},
	{
		accessorKey: "type",
		cell: ({ row }) => {
			const currentMember = row.original.type;

			if (currentMember.toLowerCase() == "apartment_complex")
				return <div className="font-medium">Apartment Complex</div>;
			else
				return (
					<div className="font-medium capitalize">
						{row.original.type.toLowerCase()}
					</div>
				);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
	},
	{
		accessorKey: "units",
		cell: ({ row }) => {
			//const col = row.original.units.length;
			return (
				<div className="font-medium text-center">
					{row.original.units.length} unit(s)
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title="Total Units/Apartment"
			/>
		),
	},

	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original as PropertyType;
			return onView || onAddUnit || onEdit || onDelete ? (
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
						{onView && (
							<DropdownMenuItem
								onClick={() => {
									if (onView) {
										onView(currentMember);
									}
								}}
								className="flex items-center justify-normal">
								<Eye className="h-4 w-4 mr-2" />
								<span>View</span>
							</DropdownMenuItem>
						)}
						{onAddUnit && (
							<DropdownMenuItem
								onClick={() => {
									if (onAddUnit) {
										onAddUnit(currentMember);
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
