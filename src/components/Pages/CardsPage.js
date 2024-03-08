import React, {useEffect, useState} from 'react';
import {CardsRender} from "../Cards/CardsRender";
import {toast} from "react-toastify";
import {getCards, handleCardLiking} from "../../services/axios/axios";

export function CardsPage({loggedInUser, setToast}) {
    function promptToastOfNotSupportedFeature() {
        setToast(toast.info('This feature will be available in the next version :)'));
    }
    async function handleCardLike(event) {
        if (loggedInUser) {
            const cardId = event.currentTarget.getAttribute('card-id');
            try {
                await handleCardLiking(cardId);
                const updateCards = cards.map(card =>
                card._id === cardId ? {...card, isFavorite: !card.isFavorite} : card);
                setCards(updateCards);
            } catch (error) {
                setToast(toast.error('Action failed: ' + error.response.data));
            }
        } else {
            setToast(toast.warning('Please login first'));
        }
    }
    const [cards,setCards] = useState(null);
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        getCards().then(response => {
        if(loggedInUser) {
                    const updateCards = response.map(card =>
                    card.likes.includes(loggedInUser._id) ? {...card, isFavorite: !card.isFavorite} : card
                    );
                    setCards(updateCards);
                } else {
                    setCards(response);
                }
                setLoading(false);
            }).catch (error => console.log(error));
    },[]);
    if (isLoading) {
        return <div className="App"></div>;
    }
    return (
        <>
            <div>
                <div className={"container-fluid content p-3 bg-opacity-75 d-flex flex-wrap"}>
                    {cards.map((card,index) => (
                        <div key={index + 100} style={{flex: '0 0 10%', padding: '10px'}}>
                        <CardsRender
                                key={index}
                                cardAlt={card.image.alt}
                                cardID={card._id}
                                cardDesc={card.description}
                                cardAddress={card.address}
                                cardPhone={card.phone}
                                cardTitle={card.title}
                                cardImageUrl={card.image.url}
                                isFavorite={card.isFavorite}
                                favFunction={handleCardLike}
                                phoneFunction={promptToastOfNotSupportedFeature}
                            ></CardsRender>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}