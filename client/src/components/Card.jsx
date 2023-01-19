import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonDetalles, DivCard, DivDetalles, ImgCard } from "./styles";

function unirGeneros (genres) {
    let acc = "";
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        if (i === 0) acc = genre;
        else acc = acc + ", " + genre;
    }
    return acc;
}

const CANTIDAD_CARACTERES_SIN_SPACE = 10;

export function formatearNombre(name) {
    if (name) {
        let nameFormat = "";
        let tope = CANTIDAD_CARACTERES_SIN_SPACE;
        for (let i = 0; i < name.length; i++) {
            let letra = name[i];
            if (tope === 0 && letra !== " ") {
                nameFormat += " ";
                tope = CANTIDAD_CARACTERES_SIN_SPACE - 1;
            }
            else if (letra === " ") tope = CANTIDAD_CARACTERES_SIN_SPACE;
            else tope--;
            nameFormat += letra;
        }
        return nameFormat;
    }
}

export default function Card ({id, name, image, genres, detail, platforms, released, rating}) {
    genres = unirGeneros(genres);
    const navigate = useNavigate();
    return (
        <DivCard>
            <ImgCard src={image} alt="Not Found"/>
            <h1 style={{color: "white", margin: "5px"}}>{formatearNombre(name)}</h1>
            <h3 style={{color: "white"}}>{genres}</h3>
            {!detail ? 
            <DivDetalles><ButtonDetalles onClick={() => navigate("/main/" + id)}>Detalles</ButtonDetalles></DivDetalles> :
            <div>
                <h3 style={{color: "white"}}>{platforms}</h3>
                <h3 style={{color: "white"}}>{released}</h3>
                <h3 style={{color: "white"}}>{rating}</h3>
            </div>
            }
        </DivCard>
    )
}