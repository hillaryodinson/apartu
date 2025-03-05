import { UserIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Nav = ({ className }: { className?: string }) => {
	const location = useLocation();
	React.useEffect(() => {
		const handleScroll = () => {
			const topnav = document.getElementById("topnav");
			if (window.scrollY > 20) {
				topnav?.classList.add("nav-sticky");
			} else {
				topnav?.classList.remove("nav-sticky");
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const isActive = (path: string, segment = 1) => {
		const currentPath = location.pathname.split("/");

		console.log(currentPath[segment], path);
		// Match the beginning of the path (handle "/about" matching "/about/team")
		return currentPath[1] === path ? "active" : "";
	};

	return (
		<>
			<nav id="topnav" className={`defaultscroll is-sticky ${className}`}>
				<div className="container relative">
					<Link className="logo" to="index.html">
						<img
							src="assets/images/logo-dark.png"
							className="inline-block dark:hidden"
							alt=""
						/>
						<img
							src="assets/images/logo-light.png"
							className="hidden dark:inline-block"
							alt=""
						/>
					</Link>

					<div className="menu-extras">
						<div className="menu-item">
							<Link
								to=""
								className="navbar-toggle"
								id="isToggle"
								onClick={() => {}}>
								<div className="lines">
									<span></span>
									<span></span>
									<span></span>
								</div>
							</Link>
						</div>
					</div>

					<ul className="buy-button list-none mb-0">
						<li className="inline mb-0">
							<Link
								to="/login"
								className="btn btn-icon bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white !rounded-full">
								<UserIcon width={18} height={18} />
							</Link>
						</li>
						<li className="sm:inline ps-1 mb-0 hidden">
							<Link
								to="/signup"
								className="btn bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white !rounded-full">
								Signup
							</Link>
						</li>
					</ul>

					<div id="navigation">
						<ul className="navigation-menu !justify-end">
							<li className={`sub-menu-item ${isActive("")} `}>
								<Link to="/">Home</Link>
							</li>
							<li
								className={`sub-menu-item ${isActive(
									"properties"
								)} `}>
								<Link to="/properties">Rent</Link>
							</li>
							<li
								className={`sub-menu-item ${isActive(
									"properties"
								)} `}>
								<Link to="/properties/1">Sell</Link>
							</li>
							<li className="has-submenu parent-parent-menu-item">
								<Link to="javascript:void(0)">Buy</Link>
								<span className="menu-arrow"></span>
								<ul className="submenu">
									<li className="has-submenu parent-menu-item">
										<Link to="javascript:void(0)">
											Apartment
										</Link>
										<span className="submenu-arrow"></span>
										<ul className="submenu">
											<li>
												<Link
													to="grid.html"
													className="sub-menu-item">
													One Bedroom
												</Link>
											</li>
											<li>
												<Link
													to="grid-sidebar.html"
													className="sub-menu-item">
													Flat
												</Link>
											</li>
											<li>
												<Link
													to="grid-map.html"
													className="sub-menu-item">
													Self Contain
												</Link>
											</li>
										</ul>
									</li>
									<li className="has-submenu parent-menu-item">
										<Link to="javascript:void(0)">
											Land
										</Link>
										<span className="submenu-arrow"></span>
										<ul className="submenu">
											<li>
												<Link
													to="list.html"
													className="sub-menu-item">
													Plots
												</Link>
											</li>
											<li>
												<Link
													to="list-sidebar.html"
													className="sub-menu-item">
													Hectares
												</Link>
											</li>
											<li>
												<Link
													to="list-map.html"
													className="sub-menu-item">
													Community Land
												</Link>
											</li>
											<li>
												<Link
													to="list-map.html"
													className="sub-menu-item">
													Government Land
												</Link>
											</li>
										</ul>
									</li>
									<li className="has-submenu parent-menu-item">
										<Link to="javascript:void(0)">
											Commercial
										</Link>
										<span className="submenu-arrow"></span>
										<ul className="submenu">
											<li>
												<Link
													to="property-detail.html"
													className="sub-menu-item">
													Hotel
												</Link>
											</li>
											<li>
												<Link
													to="property-detail-two.html"
													className="sub-menu-item">
													School
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>
								<Link
									to="/contact"
									className={`sub-menu-item ${isActive(
										"/contact"
									)} `}>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
