import React from "react";
import ROUTES from "../../components/Router/RouterModel";
import { FcAbout } from "react-icons/fc";
import {BiSolidRegistered } from "react-icons/bi";
import { PiSignInFill } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";
import { PiCardsBold } from "react-icons/pi"
import { MdOutlineFavorite } from "react-icons/md"
import { GrUserAdmin } from "react-icons/gr"

const home = {
    to: ROUTES.HOME,
    label: "Home",
    icon: <AiFillHome size={20} color={"black"} title={"Home"}/>
}
const cards = {
    to: ROUTES.CARDS,
    label: "cards",
    icon: <PiCardsBold size={25} color={"black"} title={"cards"}/>
}
const about = {
    to: ROUTES.ABOUT,
    label: "About",
    icon: <FcAbout size={25} title={"About"}/>
}
const registration = {
    to: ROUTES.REGISTRATION,
    label: "Registration",
    icon: <BiSolidRegistered size={25} color={"black"} title={"Registration"}/>
}
const signIn = {
    to: ROUTES.SIGNIN,
    label: "Sign In",
    icon: <PiSignInFill size={25} color={"black"} title={"Sign In"}/>
}
const signOut = {
    to: ROUTES.HOME,
    label: "Sign Out",
    icon: <PiSignInFill size={25} color={"black"} title={"Sign Out"}/>
}
const myCards = {
    to: ROUTES.MYCARDS,
    label: "My cards",
    icon: <PiCardsBold size={25} color={"black"} title={"My cards"}/>
}
const favCards = {
    to: ROUTES.FAVCARDS,
    label: "Favorite cards",
    icon: <MdOutlineFavorite size={25} color={"black"} title={"Favorite cards"}/>
}
const crm = {
    to: ROUTES.CRM,
    label: "CRM",
    icon: <GrUserAdmin size={25} color={"black"} title={"CRM"}/>
}

export const guestMenu = [home,cards,about,registration,signIn];
export const simpleMenu = [home,favCards,cards,about,signOut];
export const businessMenu = [home,cards,myCards,favCards,about,signOut];
export const adminMenu = [home,cards,myCards,favCards,about,crm,signOut];
