import DashboardPageHeader from "@/components/site/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ApiResponse, PropertyType, UnitType } from "@/utils/types";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardListItem from "@/components/site/card-list-item";
import api from "@/utils/api";
import PropertyOverview from "@/components/site/property-overview";
// import { usePropertyStore } from "@/store/property-store";
import { AddUnitModal } from "../Unit/components/AddUnitModal";
import { Modal } from "@/components/site/modal/modal";
import EditUnitForm from "../Unit/components/EditUnitBasicInfoForm";
import EditUnitImageForm from "../Unit/components/EditUnitImageForm";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const MyPropertyDetailsPage = () => {
	const { propertyId } = useParams();
	// const propertyStore = usePropertyStore((state) => state);
	const [editModal, setEditModal] = useState<boolean>(false);
	const [editImageModal, setEditImageModal] = useState<boolean>(false);
	// const [property, setProperty] = useState<PropertyType | null>(
	// propertyStore.selectedProperty
	// );
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [unit, setUnit] = useState<UnitType | null>(null);
	const { data: property } = useQuery({
		queryKey: ["property_overview", propertyId],
		queryFn: async () => {
			const response = await api.get(`/property/${propertyId}`);
			const result = (await response.data) as ApiResponse<PropertyType>;
			return result.data;
		},
	});

	// useEffect(() => {
	// 	const fetchProperty = async () => {
	// 		if (property == null && propertyStore.selectedProperty == null) {
	// 			try {
	// 				const response = await api.get(`/property/${propertyId}`);
	// 				const result =
	// 					(await response.data) as ApiResponse<PropertyType>;
	// 				propertyStore.setSelectedProperty(result.data!);
	// 				setProperty(result.data!);
	// 			} catch (error) {
	// 				console.error(error);
	// 				redirect("/dashboard/properties");
	// 			}
	// 		} else {
	// 			setProperty(propertyStore.selectedProperty);
	// 		}
	// 	};

	// 	fetchProperty();
	// }, [property, propertyId, propertyStore]);

	const onEdit = (unit: UnitType) => {
		setEditModal(true);
		setUnit(unit);
		console.log(unit);
	};

	const onDelete = async (unitId: string) => {
		const response = await api.delete(`/property/unit/${unitId}`);
		if (response.status === 200) {
			toast.success("Unit was deleted successfully");
		} else {
			toast.error("An error occured could not delete unit");
		}
	};

	const onChangeImage = (unit: UnitType) => {
		setEditImageModal(true);
		setUnit(unit);
		console.log(unit);
	};

	return (
		<>
			<Helmet>
				<title>{property?.name ?? " "} | Apartu</title>
			</Helmet>
			<DashboardPageHeader title="My Properties" />
			<div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-1">
					<Card className="shadow-none rounded-none">
						<CardHeader className="flex items-end">
							<div className="gap-2 flex">
								<Button
									className="!rounded-lg"
									size={"sm"}
									variant={"outline"}
									onClick={() => navigate(-1)}>
									<ChevronLeft /> Back
								</Button>
								<Button
									className="!rounded-lg bg-slate-900"
									size={"sm"}
									onClick={() => setOpenModal(true)}>
									<PlusCircle /> Add Unit
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							{property && (
								<PropertyOverview property={property} />
							)}

							{property?.units && (
								<h2 className="text-2xl font-bold"> Units </h2>
							)}
							{property ? (
								<div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
									{property.units.map((apartment) => (
										<CardListItem
											key={apartment.id}
											apartment={apartment}
											onEdit={onEdit}
											onDelete={onDelete}
											onChangeImage={onChangeImage}
										/>
									))}
								</div>
							) : (
								<Skeleton />
							)}
						</CardContent>
					</Card>
				</div>
			</div>
			<AddUnitModal
				property={property!}
				setOpen={setOpenModal}
				open={openModal}
			/>
			<Modal title="Edit Unit" open={editModal} setOpen={setEditModal}>
				{unit && (
					<EditUnitForm
						values={{ unit: unit, propertyId: property?.id ?? "" }}
						onSave={() => setEditModal(false)}
					/>
				)}
			</Modal>
			<Modal
				title={`Edit ${unit?.name ?? ""} Images`}
				open={editImageModal}
				setOpen={setEditImageModal}>
				{unit && (
					<EditUnitImageForm
						values={{
							images: unit.images,
							unitId: unit.id,
						}}
						onEdit={() => setEditImageModal(false)}
					/>
				)}
			</Modal>
		</>
	);
};

export default MyPropertyDetailsPage;
