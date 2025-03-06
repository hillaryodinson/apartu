import { BarChart3, LineChart, LucideIcon } from "lucide-react";

// Component for metric cards
function DashCard({
	title,
	value,
	icon: Icon,
	trend,
	color,
	detail,
}: {
	title: string;
	value: number;
	icon: LucideIcon;
	trend: "up" | "down" | "stable";
	color: string;
	detail: string;
}) {
	const getTrendIcon = () => {
		switch (trend) {
			case "up":
				return <BarChart3 className="h-4 w-4 text-amber-500" />;
			case "down":
				return (
					<BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
				);
			case "stable":
				return <LineChart className="h-4 w-4 text-blue-500" />;
			default:
				return null;
		}
	};

	return (
		<div
			className={`border bg-white p-4 relative overflow-hidden h-[150px]`}>
			<div className="flex items-center justify-between mb-2">
				<div className="text-lg font-bold text-slate-900">{title}</div>
				<Icon className={`h-9 w-9 text-${color}-500`} />
			</div>
			<div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-500 to-slate-900">
				{value}%
			</div>
			<div className="text-xs text-slate-500">{detail}</div>
			<div className="absolute bottom-2 right-2 flex items-center">
				{getTrendIcon()}
			</div>
			<div
				className={`absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-r opacity-90 blur-xl from-${color}-500 to-white`}></div>
		</div>
	);
}

export default DashCard;
