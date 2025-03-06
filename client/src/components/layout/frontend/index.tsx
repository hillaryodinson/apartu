import { Outlet, useLocation } from "react-router-dom";
import TagLine from "../../site/tagline";
import Nav from "../../site/nav";
import Footer from "../../site/footer";
// @ts-expect-error "Already working fine"
import "swiper/css";
import "@/app-frontend.css";

const FrontendLayout = () => {
	const location = useLocation();
	return (
		<>
			{location.pathname !== "/" ? (
				<Nav />
			) : (
				<>
					<TagLine />
					<Nav className="tagline-height" />
				</>
			)}
			<Outlet />
			<Footer />
		</>
	);
};

export default FrontendLayout;
