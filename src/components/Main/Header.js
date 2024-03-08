import React from "react";
import LeftNavigation from "../Menu/LeftNavigation";


export function Header({path, setPath, menu , setMenu, loggedInUser, setLoggedInUser,setToast}) {
    return (
        <>
            <div id={'header'}>
            <LeftNavigation setToast={setToast} path={path} setPath={setPath} menu={menu} setMenu={setMenu} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}></LeftNavigation>
            </div>
        </>
    )
}
