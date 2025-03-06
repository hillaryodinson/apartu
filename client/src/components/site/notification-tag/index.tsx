import { cn } from "@/lib/utils";

export type NotificationTagProps = {
	message: string;
	type?: "success" | "error" | "warning" | "default";
};
const NotificationTag = ({
	message,
	type = "default",
}: NotificationTagProps) => {
	return (
		<div
			className={cn("text-sm py-2 px-2", {
				"text-white bg-red-800": type == "error",
				"text-white bg-green-800": type == "success",
				"text-slate bg-yellow-800": type == "warning",
				"text-white bg-slate-800": type == "default",
			})}>
			<p>{message}</p>
		</div>
	);
};

export default NotificationTag;
