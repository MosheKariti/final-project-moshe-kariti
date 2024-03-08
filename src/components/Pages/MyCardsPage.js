import React, {useState} from "react";
import Button from "@mui/material/Button";
import {CardForm} from "../Cards/CardForm";
import {MyCardsView} from "../Cards/MyCardsView";

export function MyCardsPage({loggedInUser, setToast}) {
    const [pageState,setPageState] = useState('view');
    const [cardToEdit,setCardToEdit] = useState(null);
    let [formMode,setFormMode] = useState('');
    function handleEditCard(card) {
        setCardToEdit(card);
        setFormMode('edit');
        setPageState('cardForm');
    }
    function handleBackBtn() {
        setPageState('view');
    }
    function handleCreateCardBtn() {
        setFormMode('create');
        setPageState('cardForm');
    }
    return (
        <>
            <h2 className={"text-center"}>MY CARDS</h2>
            {pageState === 'view' &&
            <>
                <Button size={'large'} onClick={handleCreateCardBtn}>Create Card</Button>
                <MyCardsView setToast={setToast} loggedInUser={loggedInUser} handleEditCard={handleEditCard} ></MyCardsView>
            </>
            }
            {pageState === 'cardForm' &&
                <>
            <Button size={'large'} onClick={handleBackBtn}>Back</Button>
                    <CardForm setToast={setToast} setPageState={setPageState} cardToEdit={cardToEdit} formMode={formMode}></CardForm>
                </>
            }
        </>
    )
}

