

const initialState = {
    allVideogames : [],
    videogames : [],
    genres: [],
    platforms: [],
}

// ordena los videojuegos alfabéticamente de forma descendente (z -> a)
function descAlf(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.name.toLowerCase() < v2.name.toLowerCase()) return 1;
        else return -1;
    })
}

// ordena los videojuegos alfabéticamente de forma ascendente (a -> z)
function ascAlf(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.name.toLowerCase() < v2.name.toLowerCase()) return -1;
        else return 1;
    })
}

// ordena los videojuegos por rating de forma descendente (5 -> 0)
function descRat(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.rating < v2.rating) return 1;
        else return -1;
    })
}

// ordena los videojuegos por rating de forma ascendente (0 -> 5)
function ascRat(videogames) {
    return videogames.sort((v1, v2) => {
        if (v1.rating < v2.rating) return -1;
        else return 1;
    })
}

// definimos el reducer que se encargará de actualizar nuestro estado.
function rootReducer (state = initialState, action) {
    let filtrados;
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames : action.payload,
                allVideogames : [...action.payload],
            };
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
        case "FILTER_BY_ORIGIN":
            filtrados = state.allVideogames;
            if (action.payload === "db") filtrados = filtrados.filter(videogame => typeof(videogame.id) === "string");
            else if (action.payload === "api") filtrados = filtrados.filter(videogame => typeof(videogame.id)  === "number");
            return {
                ...state,
                videogames : filtrados,
            }
        case "FILTER_BY_GENRE":
            filtrados = state.allVideogames;
            filtrados = filtrados.filter(videogame => videogame.genres.includes(action.payload));
            return {
                ...state,
                videogames: filtrados,
            }
        case "ORDER":
            let ordenados = state.videogames;
            if (action.payload === "ascAlf") ordenados = ascAlf(ordenados);
            else if (action.payload === "descAlf") ordenados = descAlf(ordenados)
            else if (action.payload === "ascRat") ordenados = ascRat(ordenados);
            else ordenados = descRat(ordenados);
            return {
                ...state,
                videogames: ordenados
            }
        case "SEARCH":
            return {
                ...state,
                videogames : action.payload
            }
        case "POST_VIDEOGAME":
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default rootReducer;