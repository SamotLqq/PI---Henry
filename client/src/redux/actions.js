import axios from "axios";

const RUTA_VIDEOGAME = "http://localhost:3001/videogame";
const RUTA_VIDEOGAMES = "http://localhost:3001/videogames";
const RUTA_GENRES = "http://localhost:3001/genres";
const RUTA_PLATFORMS = "http://localhost:3001/platforms";

// Accion para traer videogames del back.
export function getVideogames(llamado) {
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

// Accion para filtrar por origen y genero.
export function filter(payload) {
    return {
        type: "FILTER",
        payload
    }
}

// Trea los videojuegos que contengan name en su name.
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
        await axios.post(RUTA_VIDEOGAMES, body);
        dispatch({
            type: "POST",
        })
    }
}

// acción para traer la descripción del videojuego.
export function getDescription(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(RUTA_VIDEOGAME + "/" + id);
            dispatch ({
                type: "GET_DESCRIPTION",
                payload: json.data
            })
        } catch (error) {
            dispatch ({
                type: "GET_DESCRIPTION",
                payload: {}
            })
        }
    }
}

// Actualizar orden
export function updateOrder(payload) {
    return {
        type: "UPDATE_ORDER",
        payload
    }
}

// Actualizar origen
export function updateOrigen(payload) {
    return {
        type: "UPDATE_ORIGEN",
        payload
    }
}

// Actualizar generos
export function updateGenres(payload) {
    return {
        type: "UPDATE_GENRES",
        payload
    }
}