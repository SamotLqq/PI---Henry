import axios from "axios";

const RUTA_VIDEOGAMES = "http://localhost:3001/videogames";
const RUTA_GENRES = "http://localhost:3001/genres";
const RUTA_PLATFORMS = "http://localhost:3001/platforms";

export function getVideogames() {
    return async function(dispatch) {
        var json = await axios.get(RUTA_VIDEOGAMES);
        dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        });
    }
}

export function getGenres() {
    return async function(dispatch) {
        var json = await axios.get(RUTA_GENRES);
        dispatch({
            type: "GET_GENRES",
            payload: json.data
        });
    }
}