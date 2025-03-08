import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const SheetComponent = ({
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
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					{children}
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SheetComponent;
