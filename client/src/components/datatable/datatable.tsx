"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { DataTablePagination } from "@/components/datatable/datatable-pagination";
import { Loader } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isFetching?: boolean;
	emptyText?: string;
}

function DataTable<TData, TValue>({
	columns,
	data,
	isFetching = false,
	emptyText = "Table is currently empty.",
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const DEFAULT_HEADER_WIDTH = 150;
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
		getPaginationRowModel: getPaginationRowModel(),
	});

	function renderRecords(): React.ReactNode {
		return table.getRowModel().rows?.length && !isFetching ? (
			table.getRowModel().rows.map((row) => (
				<TableRow
					key={row.id}
					data-state={row.getIsSelected() && "selected"}>
					{row.getVisibleCells().map((cell) => (
						<TableCell key={cell.id}>
							{flexRender(
								cell.column.columnDef.cell,
								cell.getContext()
							)}
						</TableCell>
					))}
				</TableRow>
			))
		) : (
			<TableRow>
				<TableCell
					colSpan={columns.length}
					className="h-24 text-center"
					key="no-result">
					{emptyText}
				</TableCell>
			</TableRow>
		);
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const defaultStyle =
									header.getSize() !== DEFAULT_HEADER_WIDTH
										? { width: `${header.getSize()}px` }
										: {};
								return (
									<TableHead
										key={header.id}
										style={defaultStyle}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isFetching ? (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
								key="fetching-result">
								<div className="flex flex-col items-center justify-center">
									<Loader className="h-5 w-5 rounded-none animate-spin" />
									<p>Fetching Records</p>
								</div>
							</TableCell>
						</TableRow>
					) : (
						renderRecords()
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</div>
	);
}

export default DataTable;
