import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DivCard = styled.div `
   margin: 3%;
   width: 20%;
   display: inline-block;
   text-align: center;
   background: black;
   border-radius: 10%;
`

export const ImgCard = styled.img `
    width: 100%;
    height: 100%;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;

`

function unirGeneros (genres) {
    let acc = "";
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        if (i === 0) acc = genre;
        else acc = acc + ", " + genre;
    }
    return acc;
}

export default function Card ({id, name, image, genres}) {
    genres = unirGeneros(genres);
    return (
        <DivCard>
            <ImgCard src={image} alt="Not Found"/>
            <h1 style={{color: "white", margin: "5px"}}>{name}</h1>
            <h3 style={{color: "white"}}>{genres}</h3>
            <Link to = {"/main/" + id} style={{color: "white", fontWeight: 900}}>Detalles</Link>
        </DivCard>
    )
}