import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyType } from "@/utils/types";

interface ColumnProps {
	onView?: (id: PropertyType) => void;
}

export const getColumns = ({
	onView,
}: ColumnProps): ColumnDef<PropertyType>[] => [
	{
		accessorKey: "id",
		header: "#",
		size: 100,
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: "title",
		cell: ({ row }) => {
			const currentMember = row.original as PropertyType;
			return (
				<>
					<div className="font-medium">{currentMember.name}</div>
					<div className="text-xs text-muted-foreground">
						{currentMember.address}, {currentMember.state},{" "}
						{currentMember.country}
					</div>
				</>
			);
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Property" />
		),
	},
	{
		accessorKey: "country",
		cell: ({ row }) => {
			return <div className="font-medium">{row.original.country}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Country" />
		),
	},
	{
		accessorKey: "state",
		cell: ({ row }) => {
			return <div className="font-medium">{row.original.state}</div>;
		},
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="State" />
		),
	},

	{
		id: "action",
		header: "",
		size: 50,
		cell: ({ row }) => {
			const currentMember = row.original as PropertyType;
			return onView ? (
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
					</DropdownMenuContent>
				</DropdownMenu>
			) : null;
		},
	},
];
