import DataTableColumnHeader from "@/components/datatable/datatable-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyType } from "@/utils/types";
import { Link } from "react-router-dom";

export const getColumns = (): ColumnDef<PropertyType>[] => [
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
			console.log(currentMember);
			return <div className="font-medium">{currentMember.name}</div>;
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
			const currentMember = row.original.category.name;
			return <div className="font-medium">{currentMember}</div>;
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
			return (
				<Button asChild size={"sm"}>
					<Link
						to={`/ap-admin/listings/properties/${row.original.id}`}>
						<Eye className="w-4 h-4" />
						View
					</Link>
				</Button>
			);
		},
	},
];
