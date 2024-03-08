import React from "react";
import { Link } from "react-router-dom";
import { node, string } from "prop-types";

function NavBarLink({ to, color, children }) {
    return (
        <Link to={to} state={{ color, textDecorationLine: "none"}} >
            {children}
        </Link>
    );
};
NavBarLink.propTypes = {
    children: node.isRequired,
    to: string.isRequired,
    color: string.isRequired
};

NavBarLink.defaultProps = {
    color: "#7c0202"
};

export default NavBarLink;
