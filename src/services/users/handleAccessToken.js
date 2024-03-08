import {getUserDetailsByToken} from "../axios/axios";

export async function handleAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        try {
            let user = await getUserDetailsByToken(accessToken)
            delete user.image._id;
            delete user.address._id;
            delete user.name._id;
            return user;
        } catch (error) {
            console.log(error);
        }
    } else {
        return undefined;
    }
}