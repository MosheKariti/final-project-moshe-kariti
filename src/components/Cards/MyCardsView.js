import {CardsRender} from "./CardsRender";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {deleteCard} from "../../services/axios/axios";

export function MyCardsView({handleEditCard,loggedInUser, setToast}) {
    const [cards,setCards] = useState(null);
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8181/cards').then(response => {
            if(loggedInUser) {
                const updatedCards = response.data.filter(card => card.user_id === loggedInUser._id);
                setCards(updatedCards);
            } else {
                setCards(response.data);
            }
            setLoading(false);
        }).catch (error => console.log(error));
    },[]);

    async function handleDeleteCard(event) {
        const cardId = event.currentTarget.getAttribute('card-id');
        try {
            await deleteCard(cardId);
            const updatedCards = cards.filter(card => card._id !== cardId);
            setCards(updatedCards);
            setToast(toast.success('Card has been deleted'));
        } catch (error) {
            setToast(toast.error('Delete failed: ' + error.response.data));
        }
    }
    return <>
        {!isLoading &&
        <>
            <div className={"container-fluid content p-3 bg-opacity-75 d-flex flex-wrap"}>
                {cards.map((card, index) => (
                    <div key={index + 100} id={'my-cards-view-cards-grid'}>
                        <CardsRender
                            key={index}
                            deleteFunction={handleDeleteCard}
                            editFunction={()=>handleEditCard(card)}
                            cardAlt={card.image.alt}
                            cardID={card._id}
                            isEditMode={true}
                            cardDesc={card.description}
                            cardAddress={card.address}
                            cardPhone={card.phone}
                            cardTitle={card.title}
                            cardImageUrl={card.image.url}
                        ></CardsRender>
                    </div>
                ))}
            </div>
            </>
            }
    </>
}