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

// Accion para filtrar por videojuegos de la api o de la bd.
export function filterByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    }
}

// Accion para filtrar por generos de videojuegos
export function filterByGenre(payload) {
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}

// Accion para ordenar alfabeticamente o por rating.
export function orderAction(payload) {
    return {
        type: "ORDER",
        payload
    }
}

// Trea los personajes que contengasn name en su name.
export function getNameVideogame(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`${RUTA_VIDEOGAMES}/?name=${name}`);
            dispatch({
                type: "SEARCH",
                payload: json.data
            });
        } catch (error) {
            dispatch({
                type: "SEARCH",
                payload: []
            });
        }
    }
}

// acción para subir el videojuego pasado por body a la base de datos.
export function postVideogame(body) {
    return async function (dispatch) {
        const response = await axios.post(RUTA_VIDEOGAMES, body);
        return response;
    }
}