import { string } from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NavBarLink from "./NavBarLink";
import { signOutHandler } from "../../services/users/signOutHandler";
import {useEffect} from "react";

function NavItem({setPath, path, label, to, color, icon, setMenu, setLoggedInUser } ) {
   useEffect(()=>{setPath(location.pathname)},[]);
    return (
        <>
            {label === 'Sign Out' &&
                <NavBarLink to={to} color={color}>
                    <Button className="inherit" onClick={()=>{signOutHandler(setMenu, setLoggedInUser)}}>
                        {icon}
                        <Typography style={{textTransform: 'none', fontWeight:"bold", color:"#404756"}} mt={0.3}>{label}</Typography>
                    </Button>
                </NavBarLink>
            }
            {label !== 'Sign Out' &&
                <NavBarLink to={to} color={color}>
                    <Button style={{borderRadius:'0px', borderBottom: path === to ? 'solid':''}}
                            onClick={() => setPath(to)}>
                        {icon}
                        <Typography className={'text-capitalize fw-bold'} style={{ color: "#404756"}}
                                    mt={0.3}>{label}</Typography>
                    </Button>
                </NavBarLink>
            }
        </>
    );
};

NavItem.propTypes = {
    label: string.isRequired,
    to: string.isRequired,
    color: string
};
export default NavItem;