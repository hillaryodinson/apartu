import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export const Modal = ({
	children,
	title,
	open,
	setOpen,
}: {
	children: React.ReactNode;
	title: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="overflow-y">{children}</div>
			</DialogContent>
		</Dialog>
	);
};
