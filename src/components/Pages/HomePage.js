import React, {useEffect, useState} from 'react';
import {CardsRender} from "../Cards/CardsRender";
import { motion } from "framer-motion"
import {toast} from "react-toastify";
import {getCards} from "../../services/axios/axios";

export function HomePage({setToast}) {
    const [cards, setCards] = useState(undefined);
    let cardFromServer = [];
    useEffect(()=>{
        getCards().then(response => cardFromServer = response).then(()=>{
            const firstCard = cardFromServer[0];
            const secondCard = cardFromServer[1];
            const thirdCard = cardFromServer[2];
            setCards([firstCard,secondCard,thirdCard])
        }).catch(error => console.log(error));
    },[])
    function handleLikeCard() {
        setToast(toast.warning('You be able to mark favorite in the cards page'));
    }
    function handlePhoneClick() {
        setToast(toast.info('This feature will be available in the next version :)'));
    }
    const [move, setMove] = useState(true);
    useEffect(()=>{ const interval = setInterval(()=>{setMove(!move);},1000); return ()=> clearInterval(interval);},[move]);
    return (
        <>
        <div className={"container-fluid p-5 vh-100 bg-image backgroundImageHomePage"}>
            <div className={"bg-opacity-75 text-start w-50 bg-dark text-bg-secondary p-3"}>
                <h2 className={"mt-2 font-monospace text-decoration-underline"}>Businesses From All Kinds</h2>
                <h5 className={"mt-3 font-monospace"}>In this site you can explore and find businesses from all the kinds, get started and add to your favorites list</h5>
            </div>
            {cards &&
            <>
                <div>
                    <motion.div
                        animate={{ x: move ? -200: 200}}
                        transition={{type: "spring", stiffness: 5}}
                    >
                        <div style={{display:'flex', justifyContent:'center'}} className={"container-fluid content p-3 bg-opacity-75"}>
                            {cards.map((card, index) => (
                                <CardsRender
                                    key={index}
                                    cardAlt={card.image.alt}
                                    cardID={card._id}
                                    favFunction={handleLikeCard}
                                    phoneFunction={handlePhoneClick}
                                    isEditMode={false}
                                    cardDesc={card.description}
                                    cardAddress={card.address}
                                    cardPhone={card.phone}
                                    cardTitle={card.title}
                                    cardImageUrl={card.image.url}
                                ></CardsRender>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </>
            }
        </div>

        </>
    )
}