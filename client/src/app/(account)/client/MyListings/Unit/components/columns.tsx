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
import { UnitType } from "@/utils/types";
import { getCycleLabel, toCurrency } from "@/utils/helper";

interface ColumnProps {
	onView?: (id: UnitType) => void;
	onAddUnit?: (id: UnitType) => void;
	onEdit?: (id: UnitType) => void;
	onDelete?: (id: UnitType) => void;
}

export const getColumns = ({
	onView,
	onAddUnit,
	onEdit,
	onDelete,
}: ColumnProps): ColumnDef<UnitType>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 100,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "name",
		cell: ({ row }) => {
			const currentMember = row.original as UnitType;
			return <div className="font-medium">{currentMember.name}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Unit Name" />
		),
	},
	{
		accessorKey: "type",
		cell: ({ row }) => {
			const currentMember = row.original as UnitType;
			if (currentMember.type === "ENTIRE_PROPERTY") {
				return <div className="badge">Entire Property</div>;
			} else if (currentMember.type === "ROOM") {
				return <div className="badge">Room</div>;
			} else {
				return <div className="badge">Apartment</div>;
			}
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Unit Type" />
		),
	},
	{
		accessorKey: "rentPrice",
		cell: ({ row }) => {
			return (
				<div className="font-medium">
					{toCurrency(row.original.rentPrice ?? 0)}
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Rent Price" />
		),
	},
	{
		accessorKey: "rentDuration",
		cell: ({ row }) => {
			//const col = row.original.units.length;
			return (
				<div className="font-medium text-center">
					{"Every "}
					{row.original.rentDuration}{" "}
					{getCycleLabel({
						duration: row.original.rentDuration,
						cycle: row.original.rentCycle,
					})}
				</div>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Rent Duration" />
		),
	},

	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original as UnitType;
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
