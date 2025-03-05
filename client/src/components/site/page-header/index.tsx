const PageHeader = ({ title }: { title: string }) => {
	return (
		<section className="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
			<div className="absolute inset-0 bg-slate-900 opacity-80"></div>
			<div className="container relative">
				<div className="grid grid-cols-1 text-center mt-10">
					<h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
						{title}
					</h3>
				</div>
			</div>
		</section>
	);
};

export default PageHeader;
