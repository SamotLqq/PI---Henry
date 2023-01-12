const initialState = {
    allVideogames : [],
    videogames : [],
    genres: [],
    platforms: [],
    description: {},
    genresFilter: [],
    order: "",
    origin: "",
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
            };
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
            return {
                ...state,
                videogames : action.payload,
                allVideogames: [...action.payload]
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
        default:
            return state;
    }
}

export default rootReducer;