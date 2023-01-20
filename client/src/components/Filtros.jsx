import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, updateOrigen, updateGenres, updateOrder } from "../redux/actions";
import { SelectFilter, ButtonSelect, ContenedorFiltros } from "./styles";

// Recibe el arreglo con todos los generos y retorna un arreglo con todas las renderizaciones de los mismos.
export function renderGenres (allGenres) {
    return allGenres.map((genre,i) => {
        return (
            <option key = {i} value={genre.name}>{genre.name}</option>
        )
    })
}

// Filtra los videojuegos por los generos que haya en el array pasado como argumento.
export function filtrarGenero (generos, allVideogames) {
    for (let i = 0; i < generos.length; i++) {
        allVideogames = allVideogames.filter(videogame => videogame.genres.includes(generos[i]))
    }
    return allVideogames;
}

// Filtra los videojuegos por su origen
export function filtrarOrigen (origen, allVideogames) {
    if (origen === "Creados") allVideogames = allVideogames.filter(videogame => typeof(videogame.id) === "string");
    else if (origen === "Existentes") allVideogames = allVideogames.filter(videogame => typeof(videogame.id) === "number");
    return allVideogames;
}

// ordena los videojuegos alfabéticamente de forma descendente (z -> a).
function descAlf(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.name.toLowerCase() < v2.name.toLowerCase()) return 1;
        else return -1;
    })
}

// ordena los videojuegos alfabéticamente de forma ascendente (a -> z).
function ascAlf(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.name.toLowerCase() < v2.name.toLowerCase()) return -1;
        else return 1;
    })
}

// ordena los videojuegos por rating de forma descendente (5 -> 0).
function descRat(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.rating < v2.rating) return 1;
        else return -1;
    })
}

// ordena los videojuegos por rating de forma ascendente (0 -> 5).
function ascRat(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.rating < v2.rating) return -1;
        else return 1;
    })
}

// recibe un tipo de orden, los videojuegos que se quieren ordenar y retorna los videojuegos ordenados.
export function ordenarVideojuegos(orden, allVideogames) {
    if (orden === "ascAlf") allVideogames = ascAlf(allVideogames)
    else if (orden === "descAlf") allVideogames = descAlf(allVideogames)
    else if (orden === "ascRat") allVideogames = ascRat(allVideogames)
    else if (orden === "descRat") allVideogames = descRat(allVideogames)
    return allVideogames;
}

// formatea una string del tipo de orden
function formatOrden(orden) {
    if (orden === "ascAlf") return "Ascendente Alfabético";
    else if (orden === "descAlf") return "Descendente Alfabético";
    else if (orden === "ascRat") return "Ascendente Rating";
    else if (orden === "descRat") return "Descendente Rating";
}


export default function Filtros({setPaginaActual}) {

    const dispatch = useDispatch();
    let allVideogames = useSelector(state => state.allVideogames);
    let generos = useSelector(state => state.genresFilter);
    let orden = useSelector(state => state.order);
    let origen = useSelector(state => state.origin);
    let allGenres = useSelector(state => state.genres);
    
    // borra algun filtro, ordenamiento u orden seleccionado.
    function handleDeleteFilter(e) {
        if (e.target.name === "origen") {
            dispatch(updateOrigen(""));
            allVideogames = filtrarGenero(generos, allVideogames);
            allVideogames = ordenarVideojuegos(orden, [...allVideogames]);
        }
        else if (e.target.name === "generos") {
            const valueEliminado = generos.filter(genre => genre !== e.target.value);
            dispatch(updateGenres(valueEliminado));
            allVideogames = filtrarOrigen(origen, allVideogames);
            allVideogames = filtrarGenero(valueEliminado, allVideogames);
            allVideogames = ordenarVideojuegos(orden, [...allVideogames]);
        }
        else if (e.target.name === "orden") {
            dispatch(updateOrder(""));
            allVideogames = filtrarOrigen(origen, allVideogames);
            allVideogames = filtrarGenero(generos, allVideogames);
        }
        dispatch(filter(allVideogames));
        setPaginaActual(1);
    }

    // despacha los videojuegos filtrados y ordenados.
    function handleFiltros(e) {
        e.preventDefault()
        if (e.target.name === "origen") {
            dispatch(updateOrigen(e.target.value));
            allVideogames = filtrarOrigen(e.target.value, allVideogames);
            allVideogames = filtrarGenero(generos, allVideogames);
            allVideogames = ordenarVideojuegos(orden, [...allVideogames]);
        }
        else if (e.target.name === "generos") {
            if (generos.indexOf(e.target.value) === -1) {
                dispatch(updateGenres([...generos, e.target.value]));
                allVideogames = filtrarGenero([...generos, e.target.value], allVideogames);
            }
            else allVideogames = filtrarGenero(generos, allVideogames);
            allVideogames = filtrarOrigen(origen, allVideogames);
            allVideogames = ordenarVideojuegos(orden, [...allVideogames]);
        }
        else if (e.target.name === "orden") {
            dispatch(updateOrder(e.target.value));
            allVideogames = filtrarOrigen(origen, allVideogames);
            allVideogames = filtrarGenero(generos, allVideogames);
            allVideogames = ordenarVideojuegos(e.target.value, [...allVideogames]);
        }
        dispatch(filter(allVideogames));
        setPaginaActual(1);
    }

    return (
        <ContenedorFiltros>
        <h1>Ordenamiento</h1>
        <div>
            <SelectFilter name={"orden"} defaultValue={'DEFAULT'} onChange={handleFiltros}>
                <option value={'DEFAULT'} disabled>Selecciona una orden...</option>
                <option value="ascAlf">Ascendente alfabético</option>
                <option value="descAlf">Descendente alfabético</option>
                <option value="ascRat">Ascendente rating</option>
                <option value="descRat">Descendente rating</option>
            </SelectFilter>
            {orden ? <div><ButtonSelect name="orden" value={orden} onClick={handleDeleteFilter}>{formatOrden(orden)}</ButtonSelect></div> : null}
        </div>
        <h1>Filtros</h1>
        <div>
            <SelectFilter name={"origen"} defaultValue={'DEFAULT'} onChange={handleFiltros}>
                <option value={'DEFAULT'} disabled>Selecciona origen...</option>
                <option value="Creados">Creados</option>
                <option value="Existentes">Existentes</option>
            </SelectFilter>
            {origen ? <div><ButtonSelect name="origen" value={origen} onClick={handleDeleteFilter}>{origen}</ButtonSelect></div> : null}
        </div>
        <div>
            <SelectFilter name={"generos"} defaultValue={'DEFAULT'} onChange={handleFiltros}>
                <option value={'DEFAULT'} disabled>Selecciona generos...</option>
                {allGenres && renderGenres(allGenres)}
            </SelectFilter>
            <div>{generos.map((genre,i) => <ButtonSelect key={i} name="generos" value={genre} onClick={handleDeleteFilter}>{genre}</ButtonSelect>)}</div>
        </div>
    </ContenedorFiltros>
    )
}