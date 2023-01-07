import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const allGenres = useSelector(state => state.genres);

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getVideogames())
    }

    return (
        <div style={{minWidth: "100vw", minHeight: "100vh", backgroundImage: "url(https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)"}}>
            <Link to = "/create">Subir Videojuego</Link>
            <h1>VIDEOJUEGOS</h1>
            <button onClick={handleClick}>Cargar todos los videojuegos</button>
            <div>
                <select>
                    <option value="ascAlf">Ascendente alfabético</option>
                    <option value="descAlf">Descendente alfabético</option>
                    <option value="ascRat">Ascendente rating</option>
                    <option value="descRat">Descendente rating</option>
                </select>
                <select>
                    <option value="db">Creados</option>
                    <option value="api">Existentes</option>
                    <option value="all">Todos</option>
                </select>
                <select>
                    {
                        allGenres.map((genre,i) => {
                            return (
                                <option key = {i} value={genre.name}>{genre.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                {
                    allVideogames && allVideogames.map(videogame => {
                        return (
                            <Card id = {videogame.id}  key = {videogame.id} name = {videogame.name} image = {videogame.background_image} genres = {videogame.genres}/>
                        )
                    })
                }
            </div>
        </div>
    )
}