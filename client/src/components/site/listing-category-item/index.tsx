const ListingCategoryItem = ({
	imageSrc,
	url,
	categoryName,
	count = 0,
}: {
	imageSrc: string;
	url: string;
	categoryName: string;
	count: number;
}) => {
	return (
		<div className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
			<img src={imageSrc} alt="" />
			<div className="p-4">
				<a
					href={url}
					className="text-xl font-medium hover:text-green-600">
					{categoryName}
				</a>
				<p className="text-slate-400 text-sm mt-1">
					{count} Listing(s)
				</p>
			</div>
		</div>
	);
};

export default ListingCategoryItem;
