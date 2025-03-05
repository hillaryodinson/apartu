import React from "react";
import { Link, useMatch } from "react-router-dom";

const NavItem = ({
	children,
	to,
}: {
	children: React.ReactNode;
	to: string;
}) => {
	const match = useMatch(to);
	return (
		<li className={`sub-menu-item ${match && "active"} `}>
			<Link to="/">{children}</Link>
		</li>
	);
};

export default NavItem;
