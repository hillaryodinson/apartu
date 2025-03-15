import { UnitType } from "@/utils/types";
import { useMemo } from "react";
import { getColumns } from "./components/columns";
import DataTable from "@/components/datatable/datatable";

const Units = () => {
	const columns = useMemo(
		() =>
			getColumns({
				onView: (data: UnitType) => {
					console.log(data);
				},
				onDelete: (data: UnitType) => {
					console.log(data);
				},
				onEdit: (data: UnitType) => {
					console.log(data);
				},
			}),
		[]
	);
	return <DataTable columns={columns} data={[]} />;
};

export default Units;
