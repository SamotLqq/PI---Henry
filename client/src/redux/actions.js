import axios from "axios";

const RUTA_VIDEOGAMES = "http://localhost:3001/videogames";
const RUTA_GENRES = "http://localhost:3001/genres";
const RUTA_PLATFORMS = "http://localhost:3001/platforms";

// Accion para traer videogames del back.
export function getVideogames() {
    return async function(dispatch) {
        var json = await axios.get(RUTA_VIDEOGAMES);
        dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        });
    }
}

// Acción para traer generos del back.
export function getGenres() {
    return async function(dispatch) {
        var json = await axios.get(RUTA_GENRES);
        dispatch({
            type: "GET_GENRES",
            payload: json.data
        });
    }
}

// Acción para traer las plataformas del back.
export function getPlatforms() {
    return async function(dispatch) {
        var json = await axios.get(RUTA_PLATFORMS);
        dispatch({
            type: "GET_PLATFORMS",
            payload: json.data
        });
    }
}

// Accion para filtrar que tiene en payload los videojuegos filtrados por creados o existentes.
export function filterByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}

export function filterByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function orderAction(payload) {
    return {
        type: "ORDER",
        payload
    }
}