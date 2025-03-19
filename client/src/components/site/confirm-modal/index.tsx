import { Dispatch, SetStateAction } from "react";
import { Modal } from "../modal/modal";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ConfirmModalProps {
	title: string;
	message: string;
	onOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	onConfirm: () => void;
}

const ConfirmModal = ({
	title,
	message,
	onConfirm,
	onOpen,
	setOpen,
}: ConfirmModalProps) => {
	const onSubmit = () => {
		setOpen(false);
		onConfirm();
	};

	return (
		<Modal title={title} open={onOpen} setOpen={setOpen}>
			<p className="text-center">{message}</p>
			<div className="flex flex-row justify-between pt-4">
				<Button variant={"outline"}>Cancel</Button>
				<Button
					onClick={onSubmit}
					className="bg-red-700 hover:bg-red-500 text-white">
					<Trash2 className="h-4 w-4" />
					Delete
				</Button>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
