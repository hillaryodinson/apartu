import { Outlet } from "react-router-dom";
import TagLine from "../../site/tagline";
import Nav from "../../site/nav";
import Footer from "../../site/footer";

const FrontendLayout = () => {
	return (
		<>
			<TagLine />
			<Nav />
			<div>Layout Here woot woot!!</div>
			<Outlet />
			<Footer />
		</>
	);
};

export default FrontendLayout;
