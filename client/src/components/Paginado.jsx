import React from "react";
import { ButtonCargar } from "./styles";

// handle click para la flecha retroceder avanzar.
function avanzar(setPaginaActual, paginaActual, pageNumbers) {
    if (paginaActual < pageNumbers[pageNumbers.length - 1]) {
        setPaginaActual(paginaActual + 1);
    }
}

// handle click para la flecha retroceder.
function retroceder(setPaginaActual, paginaActual, pageNumbers) {
    if (paginaActual > pageNumbers[0]) {
        setPaginaActual(paginaActual - 1);
    }
}

// Retorna un arreglo con las etiquetas necesarias para cada numero del paginado.
function renderPaginado(pageNumbers, setPaginaActual, paginaActual) {
    const copiaPageNumbers = [...pageNumbers];
    const flechaRetroceder = <ButtonCargar key={"<"} onClick={() => retroceder(setPaginaActual, paginaActual, copiaPageNumbers)} style={{width: "50px"}}>{"<"}</ButtonCargar>
    const flechaAvanzar = <ButtonCargar key={">"} onClick={() => avanzar(setPaginaActual, paginaActual, copiaPageNumbers)} style={{width: "50px"}}>{">"}</ButtonCargar>
    pageNumbers = pageNumbers.map((number, i) => {
        if (paginaActual === number) {
            return (
                <ButtonCargar key={i} onClick={() => setPaginaActual(number)} style={{background:"black", width: "50px"}}>{number}</ButtonCargar>
            )
        }
        return (
            <ButtonCargar key={i} onClick={() => setPaginaActual(number)} style={{width: "50px"}}>{number}</ButtonCargar>
        )
    })
    return [flechaRetroceder, ...pageNumbers, flechaAvanzar];
}

export default function Paginado({videogamesPorPagina, cantidadVideogames, setPaginaActual, paginaActual}) {
    const pageNumbers = [];
    const cantidadPaginas = Math.ceil(cantidadVideogames / videogamesPorPagina);

    for (let i = 0; i < cantidadPaginas; i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <div>
            {renderPaginado(pageNumbers, setPaginaActual, paginaActual)}
        </div>
    )
}