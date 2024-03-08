import Card from "@mui/material/Card";
import { CardContent, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";




export function CardsRender({isEditMode, favFunction, phoneFunction, deleteFunction, editFunction,cardID,cardTitle,cardDesc,cardPhone,cardAddress,cardAlt,cardImageUrl,isFavorite}) {
    return (
        <>
        <Card className={'card-render-main-card'}>
            <CardMedia
                sx={{height: 140}}
                image= {cardImageUrl}
                title={cardAlt}
            />
            <CardContent id={'card-render-card-content'}>
                <div id={'card-render-div-card-title-description'}>
                    <Typography gutterBottom variant="h5" component='div'>
                        {cardTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {cardDesc}
                    </Typography>
                </div>
                <div id={'card-render-div-card-street-phone'}>
                    <div>
                        <Typography variant="h5" fontSize='17px' fontWeight='medium' color="text.primary">Address</Typography>
                        <span className={'card-render-card-street-phone'}>{cardAddress.city + ', ' + cardAddress.street + ', ' + cardAddress.houseNumber}</span>
                    </div>
                    <div id={'card-render-div-card-phone'}>
                        <Typography variant="h6" fontSize='17px' color="text.primary">Phone</Typography>
                        <span className={'card-render-card-street-phone'}>{cardPhone}</span>
                    </div>
                </div>
                <div className={"d-inline-flex container-fluid mb-2 p-0"}>
                    <div className={"col-6"}>
                        {
                            isEditMode &&
                            <>
                                <div className={'text-start'}>
                                    <MdDelete card-id={cardID} onClick={deleteFunction} className={'cursor-pointer'} color={'grey'} size={30}/>
                                    <BsFillPencilFill card-id={cardID} className={'cursor-pointer'} onClick={editFunction} color={'grey'} size={25}/>
                                </div>
                            </>
                        }
                    </div>
                    <div className={"col-6"}>
                        <div  className={'text-end'}>
                            <BsFillTelephoneFill card-id={cardID} className={'cursor-pointer m-lg-1'} onClick={phoneFunction} color={'grey'} size={25}/>
                            <AiFillHeart card-id={cardID} className={'cursor-pointer'} onClick={favFunction} color={isFavorite ? 'red':'grey'} size={30}/>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        </>
    )
}