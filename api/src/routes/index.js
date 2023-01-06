const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');
const {Videogame, Genre} = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const URL_API_GAMES = "https://api.rawg.io/api/games";
const URL_API_GENRES = "https://api.rawg.io/api/genres";
const LLAMADOS_API_GAMES = 5;
const CARACTER_UUID = "-";

// Funcion para acomodar plataformas
const buildPlatforms = (platforms) => {
    let acc = "";
    for (let i = 0; i < platforms.length; i++) {
        if (i === 0) acc = platforms[i].platform.name
        else acc = acc + ", " + platforms[i].platform.name
    }
    return acc;
}

// Función que nos retorna un arreglo con 100 videojuegos de la api.
const getApiVideogames = async () => {
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
const getDbVideogames = async () => {
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
const getApiDescriptionById = async (id) => {
    let url = `${URL_API_GAMES}/${id}?key=${API_KEY}`;
    const apiAll = await axios.get(url);
    return {description_raw : apiAll.data.description_raw};
}

// Funcion que nos retorna un objeto con id y description_raw de un videojuego de la bd.
const getDbDescriptionById = async (id) => {
    let videogames = await Videogame.findAll({
        attributes: ['description_raw'],
        where: {
            id,
        }
    })
    return {description_raw : videogames[0].description_raw};
}

// Funcion que nos retorna un arreglo con todos lo generos de videojuegos.
const getApiGenres = async () => {
    let url = `${URL_API_GENRES}?key=${API_KEY}`;
    const apiAll = await axios.get(url);
    return apiAll.data.results.map(genre => {
        return {name : genre.name}
    });
}

const getPlatforms = async () => {
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
    console.log(allPlatforms);
    return allPlatforms;
}

// Ruta para pedir videojuegos de la api y de la bd desde el front. 
// Si no se le pasa query trae 100 videojuegos.
// Si se le pasa name por query se trae como máximo 15 videojuegos que contengan el name.
router.get("/videogames", async (req, res) => {
    const {name} = req.query;
    let apiVideogames = await getApiVideogames();
    let dbVideogames = await getDbVideogames();
    let allVideogames = [...dbVideogames, ...apiVideogames];
    if (name) {
        let nameVideogames = allVideogames.filter(videogame => videogame.name.toLowerCase().includes(name.toLowerCase()))
        nameVideogames.length ? 
        res.status(200).send(nameVideogames) :
        res.status(404).send("Not found videogames");
    } else {
        allVideogames = allVideogames.slice(0, 100);
        res.status(200).send(allVideogames);
    }
})

// Ruta para pedir descripción de videojuego de la api y de la bd desde el front.
router.get("/videogames/:id", async (req, res) => {
    const {id} = req.params;
    try {
        if (!id.includes(CARACTER_UUID)) {
            let apiDescription = await getApiDescriptionById(id);
            return res.status(200).send(apiDescription);
        }
        else {
            let dbDescription = await getDbDescriptionById(id);
            return res.status(200).send(dbDescription);
        }
    }
    catch (error) {
        res.status(404).send("Not found description");
    }
})

// Ruta para crear un nuevo videojuego en la bd.
router.post("/videogames", async (req, res) => {
    const {name, released, rating, platforms, genres, description_raw, background_image} = req.body;
    let newVideogame = await Videogame.create({name, released, rating, platforms, description_raw, background_image});
    let genreDb = await Genre.findAll({where:{name:genres}});
    newVideogame.addGenre(genreDb);
    res.send("Videogame was created");
})

// Ruta para guardar los géneros en la bd.
router.get("/genres", async (req, res) => {
    let genres = await getApiGenres();
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        Genre.findOrCreate({
            where: {name: genre.name}
        })
    }
    res.status(200).send(genres);
})

// Ruta para guardar las plataformas de videojuegos. 
router.get("/platforms", async(req, res) => {
    let platforms = await getPlatforms();
    platforms = platforms.map(platform => {
        return {name : platform}
    })
    res.status(200).send(platforms);
})


module.exports = buildPlatforms;
module.exports = router;
