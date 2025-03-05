import { FacebookIcon, Instagram, TwitterIcon, Phone } from "lucide-react";

const TagLine = () => {
	return (
		<div className="tagline bg-slate-900">
			<div className="container relative">
				<div className="grid grid-cols-1">
					<div className="flex items-center justify-between">
						<ul className="list-none">
							<li className="inline-flex items-center">
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
									className="feather feather-clock text-green-600 size-4">
									<circle cx="12" cy="12" r="10"></circle>
									<polyline points="12 6 12 12 16 14"></polyline>
								</svg>
								<span className="ms-2 text-slate-300">
									Mon-Sat: 9am to 6pm
								</span>
							</li>
							<li className="inline-flex items-center ms-2">
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
									className="feather feather-map-pin text-green-600 size-4">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
									<circle cx="12" cy="10" r="3"></circle>
								</svg>
								<span className="ms-2 text-slate-300">
									Houston, USA 485
								</span>
							</li>
						</ul>

						<ul className="list-none">
							<li className="inline-flex items-center">
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
									className="feather feather-mail text-green-600 size-4">
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
								<a
									href="mailto:contact@example.com"
									className="ms-2 text-slate-300 hover:text-slate-200">
									contact@example.com
								</a>
							</li>
							<li className="inline-flex items-center ms-2">
								<ul className="list-none">
									<li className="inline-flex mb-0">
										<a
											href="#!"
											className="text-slate-300 hover:text-green-600">
											<FacebookIcon
												width={18}
												height={18}
											/>
										</a>
									</li>
									<li className="inline-flex ms-2 mb-0">
										<a
											href="#!"
											className="text-slate-300 hover:text-green-600">
											<Instagram width={18} height={18} />
										</a>
									</li>
									<li className="inline-flex ms-2 mb-0">
										<a
											href="#!"
											className="text-slate-300 hover:text-green-600">
											<TwitterIcon
												width={18}
												height={18}
											/>
										</a>
									</li>
									<li className="inline-flex ms-2 mb-0">
										<a
											href="tel:+152534-468-854"
											className="text-slate-300 hover:text-green-600">
											<Phone width={18} height={18} />
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TagLine;
