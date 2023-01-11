import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, getGenres, getVideogames, getDescription, updateOrigen, updateGenres, updateOrder } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import styled from "styled-components";
import Paginado from "./Paginado";
import SearchBar from "./Search";
import { ButtonSelect } from "./Create";

// Etiquetas con estilos
export const ButtonCreate = styled.button `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    width: 200px;
    height: 40px;
    position: static;

    color: #CB3234;
    background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
    background-size: cover;

    border: 0px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`

export const Titulo = styled.p `
    color: white;
    background: black;
    height: 80px;
    width: 100%;
    font-size: 50px;
    font-weight: 900;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 25px 0px 25px 0px;
    @media (max-width: 600px) {
        font-size: 30px;
    }
`

export const ButtonCargar = styled.button `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    margin: 8px;
    width: 100px;
    height: 40px;
    position: static;
    background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
    background-size: cover;
    border: 0px;
    border-radius: 16px;
    color: #CB3234;
`

export const SelectFilter = styled.select `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    padding-left:15px;
    margin: 8px;
    width: 300px;
    height: 40px;
    position: static;
    background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
    border: 0px;
    border-radius: 16px;
    color: #CB3234;

    option {
        color: white;
        background: black;
        font-weight: 900;
        font-size: 15px;
        line-height: 150%;
        letter-spacing: -0.02em;
        border: 0px !important;
        border-radius: 16px;
      }
`

// Recibe el arreglo con todos los generos y retorna un arreglo con todas las renderizaciones de los mismos
export function renderGenres (allGenres) {
    return allGenres.map((genre,i) => {
        return (
            <option key = {i} value={genre.name}>{genre.name}</option>
        )
    })
}

// Recibe el arreglo con todos los videojuegos y retorna un arreglo con todas las renderizaciones de los mismos
function renderVideogames (allVideogames) {
    return allVideogames.map(videogame => {
        return (
            <Card id = {videogame.id}  key = {videogame.id} name = {videogame.name} image = {videogame.background_image} genres = {videogame.genres}/>
        )
    })
}

// Filtra los videojuegos por los generos que haya en el array pasado como argumento
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

// ordena los videojuegos alfabéticamente de forma descendente (z -> a)
function descAlf(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.name.toLowerCase() < v2.name.toLowerCase()) return 1;
        else return -1;
    })
}

// ordena los videojuegos alfabéticamente de forma ascendente (a -> z)
function ascAlf(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.name.toLowerCase() < v2.name.toLowerCase()) return -1;
        else return 1;
    })
}

// ordena los videojuegos por rating de forma descendente (5 -> 0)
function descRat(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.rating < v2.rating) return 1;
        else return -1;
    })
}

// ordena los videojuegos por rating de forma ascendente (0 -> 5)
function ascRat(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.rating < v2.rating) return -1;
        else return 1;
    })
}

function ordenarVideojuegos(orden, allVideogames) {
    if (orden === "ascAlf") allVideogames = ascAlf(allVideogames)
    else if (orden === "descAlf") allVideogames = descAlf(allVideogames)
    else if (orden === "ascRat") allVideogames = ascRat(allVideogames)
    else if (orden === "descRat") allVideogames = descRat(allVideogames)
    return allVideogames;
}

function inicializarEstados (dispatch) {
    dispatch(updateGenres([]))
    dispatch(updateOrigen(""))
    dispatch(updateOrder(""))
    dispatch(getVideogames(1));
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

    // despacha los videogames.
    function handleClick(e) {
        e.preventDefault()
        inicializarEstados(dispatch);
        dispatch(getVideogames())
        setPaginaActual(1);
    }

    // borra algun filtro seleccionado.
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
            <div style={{display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}><Titulo>VIDEOJUEGOS</Titulo></div>
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
                    {orden ? <ButtonSelect name="orden" value={orden} onClick={handleDeleteFilter}>{orden}</ButtonSelect> : null}
                </div>
                <div>
                    <SelectFilter name={"origen"} defaultValue={'DEFAULT'} onChange={handleFiltros} style={{marginLeft: "1vw", marginRight: "1vh"}}>
                        <option value={'DEFAULT'} disabled>Selecciona origen...</option>
                        <option value="Creados">Creados</option>
                        <option value="Existentes">Existentes</option>
                    </SelectFilter>
                    {origen ? <ButtonSelect name="origen" value={origen} onClick={handleDeleteFilter}>{origen}</ButtonSelect> : null}
                </div>
                <div>
                    <SelectFilter name={"generos"} defaultValue={'DEFAULT'} onChange={handleFiltros}>
                        <option value={'DEFAULT'} disabled>Selecciona generos...</option>
                        {allGenres && renderGenres(allGenres)}
                    </SelectFilter>
                    {generos.map((genre,i) => <ButtonSelect key={i} name="generos" value={genre} onClick={handleDeleteFilter}>{genre}</ButtonSelect>)}
                </div>
            </div>
            <Paginado paginaActual = {paginaActual} videogamesPorPagina = {videogamesPorPagina} cantidadVideogames = {videogames.length} setPaginaActual = {setPaginaActual}/>
            <div>
                {videogamesPagina && renderVideogames(videogamesPagina)}
            </div>
        </div>
    )
}