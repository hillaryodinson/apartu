const NotFound = () => {
	return (
		<section className="relative bg-green-600/5">
			<div className="container-fluid relative">
				<div className="grid grid-cols-1">
					<div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
						<div className="text-center">
							<a href="index.html">
								<img
									src="assets/images/logo-icon-64.png"
									className="mx-auto"
									alt=""
								/>
							</a>
						</div>

						<div className="title-heading text-center my-auto">
							<img
								src="assets/images/error.png"
								className="mx-auto"
								alt=""
							/>
							<h1 className="mt-3 mb-6 md:text-4xl text-3xl font-bold">
								Page Not Found?
							</h1>
							<p className="text-slate-400">
								Whoops, this is embarassing. <br /> Looks like
								the page you were looking for wasn't found.
							</p>

							<div className="mt-4">
								<a
									href="index.html"
									className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md">
									Back to Home
								</a>
							</div>
						</div>

						<div className="text-center">
							<p className="mb-0 text-slate-400">
								©{" "}
								<script>
									document.write(new Date().getFullYear())
								</script>
								2025 Hously. Design with{" "}
								<i className="mdi mdi-heart text-red-600"></i>{" "}
								by{" "}
								<a
									href="https://shreethemes.in/"
									target="_blank"
									className="text-reset">
									Shreethemes
								</a>
								.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
