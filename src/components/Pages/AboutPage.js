import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AboutPageHeader} from "../Main/AboutPageHeader";
import {CardsRender} from "../Cards/CardsRender";
import Typography from "@mui/material/Typography";

export function AboutPage() {
     const exampleCard = [
        {
            title: "Business Name",
            description: "Description",
            address: {
                city: "City",
                street: "Street",
                houseNumber: "House Number"
            },
            phone: "My Business phone",
            image: {
                url: "https://thumbs.dreamstime.com/b/small-business-wood-type-text-vintage-letterpress-ceramic-tile-background-32608566.jpg",
                alt: "business card image"
            }
        }]
            return (
        <>
            <Container maxWidth="lg">
                <AboutPageHeader/>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8} alignSelf="center">
                        <Typography variant="body" component="p" fontSize="28px">
                        On this site you can register as a business user and create business
                        cards for your business. Website users will have the option to add your
                        business to their favorites and contact you.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            display: { md: "flex", xs: "none" },
                            justifyContent: "center",
                        }}>
                        {exampleCard.map((card,index) => (
                            <CardsRender
                                key={index}
                                cardAlt={card.image.alt}
                                cardID={card._id}
                                isEditMode={true}
                                cardDesc={card.description}
                                cardAddress={card.address}
                                cardPhone={card.phone}
                                cardTitle={card.title}
                                cardImageUrl={card.image.url}
                            ></CardsRender>
                        ))}
                    </Grid>
                </Grid>
            </Container>
            </>
    );
};