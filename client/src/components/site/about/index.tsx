const AboutSection = () => {
	return (
		<>
			<section className="relative lg:py-24 py-16">
				<div className="container relative">
					<div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
						<div className="md:col-span-5">
							<div className="relative">
								<img
									src="assets/images/about.jpg"
									className="rounded-xl shadow-md"
									alt=""
								/>
								<div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
									<a
										href="#!"
										data-type="youtube"
										data-id="yba7hPeTSjk"
										className="lightbox size-20 rounded-full shadow-md dark:shadow-gray-700 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-green-600">
										<i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
									</a>
								</div>
							</div>
						</div>

						<div className="md:col-span-7">
							<div className="lg:ms-4">
								<h4 className="mb-6 md:text-3xl text-2xl lg:leading-normal leading-normal font-semibold">
									Efficiency. Transparency. <br /> Control.
								</h4>
								<p className="text-slate-400 max-w-xl">
									Apartu developed a platform for the Real
									Estate marketplace that allows buyers and
									sellers to easily execute a transaction on
									their own. The platform drives efficiency,
									cost transparency and control into the hands
									of the consumers. Apartu is Real Estate
									Redefined.
								</p>

								<div className="mt-4">
									<a
										href=""
										className="btn bg-green-600 hover:bg-green-700 text-white rounded-md mt-3">
										Learn More{" "}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container relative lg:mt-24 mt-16">
					<div className="grid grid-cols-1 pb-8 text-center">
						<h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
							How It Works
						</h3>

						<p className="text-slate-400 max-w-xl mx-auto">
							A great plateform to buy, sell and rent your
							properties without any agent or commisions.
						</p>
					</div>

					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
						<div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center">
							<div className="relative overflow-hidden text-transparent -m-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="feather feather-hexagon size-32 fill-green-600/5 mx-auto">
									<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
								</svg>
								<div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
									<i className="uil uil-estate"></i>
								</div>
							</div>

							<div className="mt-6">
								<h5 className="text-xl font-medium">
									Evaluate Property
								</h5>
								<p className="text-slate-400 mt-3">
									If the distribution of letters and 'words'
									is random, the reader will not be distracted
									from making.
								</p>
							</div>
						</div>

						<div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center">
							<div className="relative overflow-hidden text-transparent -m-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="feather feather-hexagon size-32 fill-green-600/5 mx-auto">
									<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
								</svg>
								<div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
									<i className="uil uil-bag"></i>
								</div>
							</div>

							<div className="mt-6">
								<h5 className="text-xl font-medium">
									Meeting with Agent
								</h5>
								<p className="text-slate-400 mt-3">
									If the distribution of letters and 'words'
									is random, the reader will not be distracted
									from making.
								</p>
							</div>
						</div>

						<div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center">
							<div className="relative overflow-hidden text-transparent -m-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									className="feather feather-hexagon size-32 fill-green-600/5 mx-auto">
									<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
								</svg>
								<div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
									<i className="uil uil-key-skeleton"></i>
								</div>
							</div>

							<div className="mt-6">
								<h5 className="text-xl font-medium">
									Close the Deal
								</h5>
								<p className="text-slate-400 mt-3">
									If the distribution of letters and 'words'
									is random, the reader will not be distracted
									from making.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="relative py-24 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
				<div className="absolute inset-0 bg-black/60"></div>
				<div className="container relative">
					<div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
						<div className="lg:col-start-2 lg:col-span-10">
							<div className="grid md:grid-cols-3 grid-cols-1 items-center">
								<div className="counter-box text-center">
									<h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
										<span
											className="counter-value"
											data-target="1548">
											1548
										</span>
										+
									</h1>
									<h5 className="counter-head text-white text-lg font-medium">
										Properties Sell
									</h5>
								</div>

								<div className="counter-box text-center">
									<h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
										<span
											className="counter-value"
											data-target="25">
											25
										</span>
										+
									</h1>
									<h5 className="counter-head text-white text-lg font-medium">
										Award Gained
									</h5>
								</div>

								<div className="counter-box text-center">
									<h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
										<span
											className="counter-value"
											data-target="9">
											9
										</span>
										+
									</h1>
									<h5 className="counter-head text-white text-lg font-medium">
										Years Experience
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AboutSection;
