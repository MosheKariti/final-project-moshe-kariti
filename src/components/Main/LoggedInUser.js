import Button from "@mui/material/Button";
import { BsPersonSquare } from "react-icons/bs"
import {useState} from "react";
import {UpdateUser} from "./UpdateUser";

export function LoggedInUser({loggedInUser, setToast}) {
    const [isEditUser,setIsEditUser] = useState(false);
    function handelEditUser() {
        setIsEditUser(!isEditUser);
    }
    return (
        <>
            {isEditUser &&
            <>
            <div className={"modal bg-opacity-50 bg-dark"} id={'myModal'}>
                <div className={"modal-dialog-centered"}>
                    <div className={"modal-content"}>
                        <div>
                            <UpdateUser setToast={setToast} loggedInUser={loggedInUser} setIsEditUser={setIsEditUser}></UpdateUser>
                        </div>
                        <Button className={'text-capitalize fs-5'} onClick={()=>setIsEditUser(false)}>Close</Button>
                    </div>
                </div>
            </div>
            </>
            }
            {loggedInUser &&
                <>
                    <div className={'p-2 logged-in-user cursor-pointer'}>
                        <BsPersonSquare onClick={handelEditUser} size={30}/>
                    </div>
                    <div className={'logged-in-user text-capitalize'}>
                            {loggedInUser.name.first}
                    </div>
                </>
            }
        </>
    )
}
