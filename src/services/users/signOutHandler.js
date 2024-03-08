import { guestMenu } from "../menu/menusHandler";

export function signOutHandler(setMenu, setLoggedInUser) {
        setLoggedInUser(null);
        setMenu(guestMenu);
        localStorage.removeItem('accessToken');
}
