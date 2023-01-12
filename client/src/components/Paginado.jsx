import React from "react";
import { ButtonCargar } from "./styles";

// Retorna un arreglo con las etiquetas necesarias para cada numero del paginado.
function renderPaginado(pageNumbers, setPaginaActual, paginaActual) {
    return pageNumbers.map((number, i) => {
        if (paginaActual === number) {
            return (
                <ButtonCargar key={i} onClick={() => setPaginaActual(number)} style={{background:"black", width: "50px"}}>{number}</ButtonCargar>
            )
        }
        return (
            <ButtonCargar key={i} onClick={() => setPaginaActual(number)} style={{width: "50px"}}>{number}</ButtonCargar>
        )
    })
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