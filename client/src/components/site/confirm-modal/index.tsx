import { Dispatch, ReactNode, SetStateAction } from "react";
import { Modal } from "../modal/modal";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ConfirmModalProps {
	title: string;
	children: ReactNode;
	onOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	onConfirm: () => void;
}

const ConfirmModal = ({
	title,
	children,
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
			{children}
			<div className="flex flex-row justify-between pt-4">
				<Button variant={"outline"} onClick={() => setOpen(false)}>
					Cancel
				</Button>
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
