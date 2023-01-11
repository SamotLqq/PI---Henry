import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, filterByOrigin, filterByGenre, orderAction, getDescription } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import styled from "styled-components";
import Paginado from "./Paginado";
import SearchBar from "./Search";

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
        dispatch(getDescription(0));
        if (allVideogames.length === 0) dispatch(getVideogames());
        if (allGenres.length === 0) dispatch(getGenres());
    }, [])

    // despacha los videogames.
    function handleClick(e) {
        e.preventDefault()
        dispatch(getVideogames(1))
        setPaginaActual(1);
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
        setOrder("Ordenado" + e.target.value);
        dispatch(orderAction(e.target.value));
        setPaginaActual(1);
    }

    return (
        <div style={{minWidth: "100vw", minHeight: "100vh", backgroundImage: "url(https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)"}}>
            <Link to = "/create">
                <ButtonCreate>Subir Videojuego</ButtonCreate>
            </Link>
            <div style={{display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center"}}><Titulo>VIDEOJUEGOS</Titulo></div>
            <ButtonCargar onClick={handleClick} style={{width: "350px"}}>Cargar todos los videojuegos</ButtonCargar>
            <SearchBar setPaginaActual = {paginado}/>
            <div>
                <SelectFilter defaultValue={'DEFAULT'} onChange={handleOrder}>
                    <option value={'DEFAULT'} disabled>Selecciona una orden...</option>
                    <option value="ascAlf">Ascendente alfabético</option>
                    <option value="descAlf">Descendente alfabético</option>
                    <option value="ascRat">Ascendente rating</option>
                    <option value="descRat">Descendente rating</option>
                </SelectFilter>
                <SelectFilter defaultValue={'DEFAULT'} onChange={handleOrigin} style={{marginLeft: "1vw", marginRight: "1vh"}}>
                    <option value={'DEFAULT'} disabled>Selecciona origen...</option>
                    <option value="db">Creados</option>
                    <option value="api">Existentes</option>
                </SelectFilter>
                <SelectFilter defaultValue={'DEFAULT'} onChange={handleGenre}>
                    <option value={'DEFAULT'} disabled>Selecciona generos...</option>
                    {allGenres && renderGenres(allGenres)}
                </SelectFilter>
            </div>
            <Paginado paginaActual = {paginaActual} videogamesPorPagina = {videogamesPorPagina} cantidadVideogames = {allVideogames.length} setPaginaActual = {paginado}/>
            <div>
                {videogamesPagina && renderVideogames(videogamesPagina)}
            </div>
        </div>
    )
}