import { filtrarGenero, filtrarOrigen, ordenarVideojuegos } from "../components/Filtros";

const initialState = {
    allVideogames : [],
    videogames : [],
    genres: [],
    platforms: [],
    description: {},
    genresFilter: [],
    order: "",
    origin: "",
    busqueda: "",
    searchOn: false,
    searchActual: ""
}

// definimos el reducer que se encargará de actualizar nuestro estado.
function rootReducer (state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":  
            return {
                ...state,
                videogames : action.payload,
                allVideogames : [...action.payload],
            }
        case "GET_GENRES":
            return {
                ...state,
                genres : action.payload,
            }
        case "GET_PLATFORMS":
            return {
                ...state,
                platforms: action.payload,
            }
        case "GET_DESCRIPTION":
            return {
                ...state,
                description: action.payload
            }
        case "FILTER":
            return {
                ...state,
                videogames: action.payload
            }
        case "SEARCH":
            let ordenadoFiltrado = [...action.payload];
            ordenadoFiltrado = filtrarGenero(state.genresFilter, ordenadoFiltrado);
            ordenadoFiltrado = filtrarOrigen(state.origin, ordenadoFiltrado);
            ordenadoFiltrado = ordenarVideojuegos(state.order, ordenadoFiltrado);
            return {
                ...state,
                videogames : ordenadoFiltrado,
                allVideogames: action.payload
            }
        case "POST":
            return state;
        case "UPDATE_ORDER":
            return {
                ...state,
                order: action.payload
            }
        case "UPDATE_GENRES":
            return {
                ...state,
                genresFilter: action.payload
            }
        case "UPDATE_ORIGEN":
            return {
                ...state,
                origin: action.payload
            }
        case "UPDATE_BUSQUEDA":
            return {
                ...state,
                busqueda: action.payload
            }
        case "UPDATE_SEARCH_ON":
            return {
                ...state,
                searchOn: action.payload
            }
        case "UPDATE_SEARCH_ACTUAL":
            return {
                ...state,
                searchActual: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;