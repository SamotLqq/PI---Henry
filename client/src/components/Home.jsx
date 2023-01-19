import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, getDescription, updateOrigen, updateGenres, updateOrder } from "../redux/actions";
import { Link } from "react-router-dom";
import { ButtonCargar, ButtonCreate, Titulo, ContenedorFiltrosPadre, GIF_LOADING } from "./styles";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./Search";
import Filtros from "./Filtros";
const SLUG_VACIAR_DETALLE = 0;

// Recibe el arreglo con todos los videojuegos y retorna un arreglo con todas las renderizaciones de los mismos.
function renderVideogames (allVideogames) {
    return allVideogames.map(videogame => {
        return (
            <Card id = {videogame.id}  key = {videogame.id} name = {videogame.name} image = {videogame.background_image} genres = {videogame.genres}/>
        )
    })
}

// Inicializa los filtros en su estado inicial y trae todos los videojuegos del back.
export function inicializarEstados (dispatch) {
    dispatch(updateGenres([]))
    dispatch(updateOrigen(""))
    dispatch(updateOrder(""))
    dispatch(getVideogames());
}

export default function Home() {
    const dispatch = useDispatch();
    let videogames = useSelector(state => state.videogames);
    const allGenres = useSelector(state => state.genres);
    const [paginaActual, setPaginaActual] = useState(1);
    const [loading, setLoading] = useState(false);

    const videogamesPorPagina = 15;

    const firstGameNext = videogamesPorPagina * paginaActual;
    const firstGame = firstGameNext - videogamesPorPagina;
    const videogamesPagina = videogames.slice(firstGame, firstGameNext);

    // despacha los videogames y generos al state cuando se monta el componente, también borra la descripción.
    useEffect(() => {
        setLoading(true);
        dispatch(getDescription(SLUG_VACIAR_DETALLE))
        if (videogames.length === 0) dispatch(getVideogames());
        if (allGenres.length === 0) dispatch(getGenres());
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, [])

    // despacha los videogames e inicializa los estados.
    function handleClick(e) {
        e.preventDefault()
        setLoading(true);
        inicializarEstados(dispatch);
        setPaginaActual(1);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }

    return (
        <div style={{minWidth: "100vw", minHeight: "100vh", backgroundImage: "url(https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)"}}>
            <div style={{backgroundColor: "rgba(255,255,255,0.8)"}}>
                <Link to = "/create"> <ButtonCreate>Subir Videojuego</ButtonCreate> </Link>
            </div>
            <Titulo>VIDEOJUEGOS</Titulo>
            <div style={{backgroundColor: "rgba(255,255,255,0.8)", border: "5px solid black"}}>
                <ButtonCargar onClick={handleClick} style={{width: "350px"}}>Cargar todos los videojuegos</ButtonCargar>
            </div>
            <ContenedorFiltrosPadre>
                <SearchBar setPaginaActual = {setPaginaActual} setLoading = {setLoading}/>
                <Filtros setPaginaActual = {setPaginaActual}/>
            </ContenedorFiltrosPadre>
            {!loading && videogamesPagina.length !== 0 && <Paginado paginaActual = {paginaActual} videogamesPorPagina = {videogamesPorPagina} cantidadVideogames = {videogames.length} setPaginaActual = {setPaginaActual}/>}
            {loading &&  <img src={GIF_LOADING} alt="Loading..." />}
            {!loading && videogamesPagina.length !== 0 && renderVideogames(videogamesPagina)}
            {!loading && videogamesPagina.length === 0 && <Titulo>No se encontraron videojuegos</Titulo>}
        </div>
    )
}