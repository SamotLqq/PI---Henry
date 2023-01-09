import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, filterByOrigin, filterByGenre, orderAction } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import styled from "styled-components";
import Paginado from "./Paginado";
import SearchBar from "./Search";

// Etiquetas con estilos
export const ButtonCreate = styled.button `
    cursor:pointer;
    background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
    color: #CB3234;
    border: none;
    border-bottom-left-radius: 1vw;
    border-bottom-right-radius: 1vw;
    font-size: 2vw;
    font-weight: 900;
`

export const Titulo = styled.h1 `
    color: white;
    background: black;
    border-radius: 1vw;
    padding: 0.5vw;
    font-size: 3vw;
    font-weight: 700;
    display: inline-block;
    margin-bottom: 0px;
    margin-top: 2vh;

`

export const ButtonCargar = styled.button `
    cursor:pointer;
    background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
    background-size: cover;
    color: #CB3234;
    border: none;
    border-radius: 2vw;
    font-size: 2vw;
    font-weight: 900;
    margin: 2vh;
`
export const SelectFilter = styled.select `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    padding-left:8px;
    position: static;
    width: 300px;
    height: 40px;
    background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
    border: 0px !important;
    border-radius: 16px;
    margin-right: 8px;
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

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const allGenres = useSelector(state => state.genres);
    const videogamesPorPagina = 15;
    const [paginaActual, setPaginaActual] = useState(1);
    const firstGameNext = videogamesPorPagina * paginaActual;
    const firstGame = firstGameNext - videogamesPorPagina;
    const videogamesPagina = allVideogames.slice(firstGame, firstGameNext);
    const [order, setOrder] = useState("");

    function paginado (numberPage) {
        setPaginaActual(numberPage);
    }

    // despacha los videogames y los generos al state cuando se monta el componente.
    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [])

    // despacha los videogames.
    function handleClick(e) {
        e.preventDefault()
        dispatch(getVideogames())
    }

    function handleOrigin (e) {
        e.preventDefault()
        dispatch(filterByOrigin(e.target.value));
        setPaginaActual(1);
    }

    function handleGenre (e) {
        e.preventDefault()
        dispatch(filterByGenre(e.target.value));
        setPaginaActual(1);
    }

    function handleOrder (e) {
        e.preventDefault();
        setPaginaActual(1);
        setOrder("Ordenado" + e.target.value);
        dispatch(orderAction(e.target.value));
    }

    return (
        <div style={{minWidth: "100vw", minHeight: "100vh", backgroundImage: "url(https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)"}}>
            <Link to = "/create">
                <ButtonCreate>Subir Videojuego</ButtonCreate>
            </Link>
            <div><Titulo>VIDEOJUEGOS</Titulo></div>
            <ButtonCargar onClick={handleClick}>Cargar todos los videojuegos</ButtonCargar>
            <SearchBar setPaginaActual = {paginado}/>
            <div>
                <SelectFilter onChange={handleOrder}>
                    <option value="ascAlf">Ascendente alfabético</option>
                    <option value="descAlf">Descendente alfabético</option>
                    <option value="ascRat">Ascendente rating</option>
                    <option value="descRat">Descendente rating</option>
                </SelectFilter>
                <SelectFilter onChange={handleOrigin} style={{marginLeft: "1vw", marginRight: "1vh"}}>
                    <option value="db">Creados</option>
                    <option value="api">Existentes</option>
                    <option value="all">Todos</option>
                </SelectFilter>
                <SelectFilter onChange={handleGenre}>
                    {allGenres && renderGenres(allGenres)}
                </SelectFilter>
            </div>
            <Paginado videogamesPorPagina = {videogamesPorPagina} cantidadVideogames = {allVideogames.length} setPaginaActual = {paginado}/>
            <div>
                {videogamesPagina && renderVideogames(videogamesPagina)}
            </div>
        </div>
    )
}