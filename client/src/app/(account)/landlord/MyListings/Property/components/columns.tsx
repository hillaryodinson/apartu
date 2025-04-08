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
import { Badge } from "@/components/ui/badge";

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
		size: 10,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as PropertyType;
			return (
				<Link to="#" onClick={() => onView && onView(currentMember)}>
					<div className="font-medium">{currentMember.name}</div>
					<div className="text-xs text-muted-foreground">
						{currentMember.address}
					</div>
				</Link>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Property" />
		),
	},
	{
		accessorKey: "type",
		cell: ({ row }) => {
			const currentMember = row.original.category.name;
			return <div className="font-medium">{currentMember}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
	},
	{
		accessorKey: "rentalType",
		cell: ({ row }) => {
			const currentMember = row.original.rentalType;
			return (
				<div className="w-full flex align-items-center">
					<Badge variant={"outline"} className="capitalize">
						{currentMember !== "whole"
							? "units"
							: currentMember + " Property"}
					</Badge>
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Rental Type" />
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
