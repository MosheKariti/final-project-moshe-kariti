import {createCard, createUser, getCards} from "../axios/axios";
import axios from "axios";
import {initialCards} from "../../InitialData/initialData";
import {systemUser} from "../../InitialData/initialData";


export function initDb() {
    let cardsAlreadyCreated = false;
    let accessToken;
    let cards;
    getCards()
        .then(response => cards = response)
        .then(()=> {
            cards.forEach((card) => {
                if (card.email === 'systemcard1@gmail.com') {
                    cardsAlreadyCreated = true;
                }
            });
        })
        .then(()=>{
            if (!cardsAlreadyCreated) {
                createUser(systemUser)
                    .then(()=>
                        axios.post(`http://localhost:8181/users/login`, {email:'moshek.system.user@gmail.com',password:'SystemUser123!'})
                        .then(response => accessToken = response.data).catch(error => console.log(error)))
                        .then(()=>{
                            initialCards.forEach((card)=>{
                            createCard(card,accessToken).catch(error => console.log(error));
                        });
                    })
                    .catch(error => console.log(error));
            }
        }).catch(error => console.log(error));
}
