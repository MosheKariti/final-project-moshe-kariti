import axios from "axios";
import jwtDecode from "jwt-decode";

//USER
export async function createUser(user) {
    await axios.post('http://localhost:8181/users', user)
}
export async function login(post) {
    const loginResponse = await axios.post(`http://localhost:8181/users/login`, post);
    const accessToken = loginResponse.data.token;
    const user = await getUserDetailsByToken(accessToken);
    return user;
}
export async function getUserDetailsByToken(accessToken) {
    const decodedToken = jwtDecode(accessToken);
    localStorage.setItem('accessToken',accessToken);
    // Use decoded token to fetch user data
    const userDataResponse = await axios.get(`http://localhost:8181/users/${decodedToken.id}`, {
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
    return userDataResponse.data;
}
export async function updateUser(user) {
    const accessToken = localStorage.getItem('accessToken');
    await axios.put('http://localhost:8181/users/' + user._id, user,{
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
}
export async function getUsers() {
    const accessToken = localStorage.getItem('accessToken');
    const users = await axios.get('http://localhost:8181/users',{
        headers: {
            'x-auth-token': accessToken,
        }
    });
    return users.data;
}
export async function deleteUser(userId) {
    const accessToken = localStorage.getItem('accessToken');
    const deleteResponse = await axios.delete('http://localhost:8181/users/' + userId,{
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
    return deleteResponse.data;
}
export async function changeUserType(userId) {
    const accessToken = localStorage.getItem('accessToken');
    const changeTypeResponse = await axios.patch('http://localhost:8181/users/' + userId,{},{
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
    return changeTypeResponse.data;
}

//CARDS
export async function createCard(card,systemToken) {
    let accessToken;
    if (systemToken) {
        accessToken = systemToken;
    } else {
        accessToken = localStorage.getItem('accessToken');
    }
    await axios.post('http://localhost:8181/cards', card,{
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
}
export async function getCards() {
    const cards = await axios.get('http://localhost:8181/cards');
    return cards.data;
}
export async function updateCard(card,cardId) {
    const accessToken = localStorage.getItem('accessToken');
    await axios.put('http://localhost:8181/cards/' + cardId, card,{
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
}
export async function handleCardLiking(cardID) {
    const accessToken = localStorage.getItem('accessToken');
    const favoriteResponse = await axios.patch(`http://localhost:8181/cards/${cardID}`,{},{
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
    return favoriteResponse;
}
export async function deleteCard(cardId) {
    const accessToken = localStorage.getItem('accessToken');
    await axios.delete('http://localhost:8181/cards/' + cardId,{
        headers: {
            authorization: `x-auth-token ${accessToken}`
        }
    });
}