
const initialState = {
    videogames : [],
    genres: []
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames : action.payload
            };
        case "GET_GENRES":
            return {
                ...state,
                genres : action.payload
            };
        default:
            return state;
    }
}

export default rootReducer;