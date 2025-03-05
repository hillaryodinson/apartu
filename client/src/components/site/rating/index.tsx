// import { StarIcon } from "lucide-react";

// import { Star, StarOutline } from "../icons";
import StarIcon from "@mui/icons-material/StarOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutlineOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";

const Rating = ({ value = 5, total = 0 }: { value: number; total: number }) => {
	return (
		<ul className="text-lg font-medium text-amber-400 list-none d-flex">
			{[...Array(5)].map((_, index) => (
				<li key={index} className="inline">
					{value >= index + 1 ? (
						<StarIcon />
					) : value >= index + 0.5 ? (
						<StarHalfOutlinedIcon />
					) : (
						<StarOutlineIcon />
					)}
				</li>
			))}
			<li className="inline text-slate-900 dark:text-white">
				{value.toFixed(1)}({total})
			</li>
		</ul>
	);
};

export default Rating;
