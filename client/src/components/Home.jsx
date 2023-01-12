import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, getGenres, getVideogames, getDescription, updateOrigen, updateGenres, updateOrder } from "../redux/actions";
import { Link } from "react-router-dom";
import { ButtonCargar, ButtonCreate, SelectFilter, Titulo, ButtonSelect } from "./styles";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./Search";

// Recibe el arreglo con todos los generos y retorna un arreglo con todas las renderizaciones de los mismos.
export function renderGenres (allGenres) {
    return allGenres.map((genre,i) => {
        return (
            <option key = {i} value={genre.name}>{genre.name}</option>
        )
    })
}

// Recibe el arreglo con todos los videojuegos y retorna un arreglo con todas las renderizaciones de los mismos.
function renderVideogames (allVideogames) {
    return allVideogames.map(videogame => {
        return (
            <Card id = {videogame.id}  key = {videogame.id} name = {videogame.name} image = {videogame.background_image} genres = {videogame.genres}/>
        )
    })
}

// Filtra los videojuegos por los generos que haya en el array pasado como argumento.
function filtrarGenero (generos, allVideogames) {
    for (let i = 0; i < generos.length; i++) {
        allVideogames = allVideogames.filter(videogame => videogame.genres.includes(generos[i]))
    }
    return allVideogames;
}

// Filtra los videojuegos por su origen
function filtrarOrigen (origen, allVideogames) {
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
function ordenarVideojuegos(orden, allVideogames) {
    if (orden === "ascAlf") allVideogames = ascAlf(allVideogames)
    else if (orden === "descAlf") allVideogames = descAlf(allVideogames)
    else if (orden === "ascRat") allVideogames = ascRat(allVideogames)
    else if (orden === "descRat") allVideogames = descRat(allVideogames)
    return allVideogames;
}

// Inicializa los filtros en su estado inicial y trae todos los videojuegos.
function inicializarEstados (dispatch) {
    dispatch(updateGenres([]))
    dispatch(updateOrigen(""))
    dispatch(updateOrder(""))
    dispatch(getVideogames());
}

export default function Home() {
    const dispatch = useDispatch();
    let allVideogames = useSelector(state => state.allVideogames);
    let videogames = useSelector(state => state.videogames);
    let orden = useSelector(state => state.order);
    let generos = useSelector(state => state.genresFilter);
    let origen = useSelector(state => state.origin);
    const allGenres = useSelector(state => state.genres);
    const [paginaActual, setPaginaActual] = useState(1);

    const videogamesPorPagina = 15;

    const firstGameNext = videogamesPorPagina * paginaActual;
    const firstGame = firstGameNext - videogamesPorPagina;
    const videogamesPagina = videogames.slice(firstGame, firstGameNext);

    // despacha los videogames y los generos al state cuando se monta el componente.
    useEffect(() => {
        dispatch(getDescription(0));
        if (videogames.length === 0) dispatch(getVideogames());
        if (allGenres.length === 0) dispatch(getGenres());
    }, [])

    // despacha los videogames e inicializa los estados.
    function handleClick(e) {
        e.preventDefault()
        inicializarEstados(dispatch);
        setPaginaActual(1);
    }

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
        <div style={{minWidth: "100vw", minHeight: "100vh", backgroundImage: "url(https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)"}}>
            <Link to = "/create">
                <ButtonCreate onClick={() => inicializarEstados(dispatch)}>Subir Videojuego</ButtonCreate>
            </Link>
            <Titulo>VIDEOJUEGOS</Titulo>
            <ButtonCargar onClick={handleClick} style={{width: "350px"}}>Cargar todos los videojuegos</ButtonCargar>
            <SearchBar setPaginaActual = {setPaginaActual}/>
            <div style={{display:"inline-block", justifyContent: "center"}}>
                <div>
                    <SelectFilter name={"orden"} defaultValue={'DEFAULT'} onChange={handleFiltros}>
                        <option value={'DEFAULT'} disabled>Selecciona una orden...</option>
                        <option value="ascAlf">Ascendente alfabético</option>
                        <option value="descAlf">Descendente alfabético</option>
                        <option value="ascRat">Ascendente rating</option>
                        <option value="descRat">Descendente rating</option>
                    </SelectFilter>
                    {orden ? <div><ButtonSelect name="orden" value={orden} onClick={handleDeleteFilter}>{orden}</ButtonSelect></div> : null}
                </div>
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
            </div>
            <Paginado paginaActual = {paginaActual} videogamesPorPagina = {videogamesPorPagina} cantidadVideogames = {videogames.length} setPaginaActual = {setPaginaActual}/>
            <div>
                {videogamesPagina && renderVideogames(videogamesPagina)}
            </div>
        </div>
    )
}