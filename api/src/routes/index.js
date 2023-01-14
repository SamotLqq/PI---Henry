URL_API_GAMES = "https://api.rawg.io/api/games";
URL_API_GENRES = "https://api.rawg.io/api/genres";
LLAMADOS_API_GAMES = 5;
CARACTER_UUID = "-";
VIDEOJUEGOS_SOLICITADOS = 15;

const {Videogame, Genre} = require('../db.js');
const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env;

// Funcion para acomodar plataformas cuando vienen de la api.
buildPlatforms = (platforms) => {
    let acc = "";
    for (let i = 0; i < platforms.length; i++) {
        if (i === 0) acc = platforms[i].platform.name
        else acc = acc + ", " + platforms[i].platform.name
    }
    return acc;
}

// Funcion para acomodar plataformas cuando vienen del front.
buildPlatforms2 = (platforms) => {
    let acc = "";
    for (let i = 0; i < platforms.length; i++) {
        if (i === 0) acc = platforms[i];
        else acc = acc + ", " + platforms[i];
    }
    return acc;
}


// Función que nos retorna un arreglo con 100 videojuegos de la api.
getApiVideogames = async () => {
    let url = URL_API_GAMES + "?key=" + API_KEY;
    let allVideogames = [];
    for (let i = 0; i < LLAMADOS_API_GAMES; i++) {
        const apiAll = await axios.get(url);
        const apiData = await apiAll.data.results;
        for (let i = 0; i < apiData.length; i++) {
            const videogame = apiData[i];
            let {id, name, released, rating, platforms, genres, background_image} = videogame;
            platforms = buildPlatforms(platforms);
            genres = genres.map(genre => genre.name);
            allVideogames.push({id, name, released, rating, platforms, genres, background_image})
        }
        url = apiAll.data.next;
    }
    return allVideogames;
}

// Funcion que nos retorna un arreglo con los videojuegos de la bd.
getDbVideogames = async () => {
    let videogames = await Videogame.findAll({
        attributes: ['id', 'name', 'released', 'rating', 'platforms', 'background_image'],
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    videogames = videogames.map(videogame => {
        let infoVideogame = videogame.dataValues;
        infoVideogame.genres = infoVideogame.genres.map(genre => genre.dataValues.name)
        return infoVideogame;
    })
    return videogames;
}


// Funcion que nos retorna un objeto con id y descripcion_raw de un videojuego de la api.
getApiById = async (id) => {
    let url = `${URL_API_GAMES}/${id}?key=${API_KEY}`;
    const apiAll = await axios.get(url);
    let {name, released, rating, platforms, genres, background_image, description_raw} = apiAll.data;
    platforms = buildPlatforms(platforms);
    genres = genres.map(genre => genre.name);
    return {name, released, rating, platforms, genres, background_image, description_raw};
}

// Funcion que nos retorna un objeto con id y description_raw de un videojuego de la bd.
getDbById = async (id) => {
    let videogames = await Videogame.findAll({
        where: {
            id,
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    let {name, released, rating, genres, background_image, platforms, description_raw} = videogames[0].dataValues;
    genres = genres.map(genre => genre.dataValues.name)
    return {name, released, rating, genres, background_image, platforms, description_raw};
}

// Funcion que nos retorna un arreglo con todos lo generos de videojuegos.
getApiGenres = async () => {
    let url = `${URL_API_GENRES}?key=${API_KEY}`;
    const apiAll = await axios.get(url);
    return apiAll.data.results.map(genre => {
        return {name : genre.name}
    });
}

// Funcion que nos retorna un arreglo con todas las plataformas de videojuegos.
getApiPlatforms = async () => {
    let url = URL_API_GAMES + "?key=" + API_KEY;
    let allPlatforms = [];
    for (let i = 0; i < LLAMADOS_API_GAMES; i++) {
        const apiAll = await axios.get(url);
        const apiData = await apiAll.data.results;
        for (let i = 0; i < apiData.length; i++) {
            const videogame = apiData[i];
            let {platforms} = videogame;
            for (let i = 0; i < platforms.length; i++) {
                const platform = platforms[i].platform.name;
                if(allPlatforms.indexOf(platform) === -1) allPlatforms.push(platform); 
            }
        }
        url = apiAll.data.next;
    }
    return allPlatforms;
}

module.exports = { getApiPlatforms, getApiGenres, getApiById, getApiVideogames, getDbById, getDbVideogames, buildPlatforms, buildPlatforms2,
URL_API_GAMES, URL_API_GENRES, LLAMADOS_API_GAMES, CARACTER_UUID, VIDEOJUEGOS_SOLICITADOS }