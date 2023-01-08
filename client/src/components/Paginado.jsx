import React from "react";
import { ButtonCargar } from "./Home";

export default function Paginado({videogamesPorPagina, cantidadVideogames, setPaginaActual}) {
    const pageNumbers = [];
    const cantidadPaginas = Math.ceil(cantidadVideogames / videogamesPorPagina);

    for (let i = 0; i < cantidadPaginas; i++) {
        pageNumbers.push(i + 1);
    }

    // Retorna un arreglo con las etiquetas necesarias para cada numero del paginado.
    function renderPaginado(pageNumbers) {
        return pageNumbers.map((number, i) => {
            return (
                <ButtonCargar key={i} onClick={() => setPaginaActual(number)}>{number}</ButtonCargar>
            )
        })
    }

    return (
        <div>
            {renderPaginado(pageNumbers)}
        </div>
    )
}