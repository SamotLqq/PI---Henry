const { Router } = require('express');
const {Videogame, Genre} = require('../db.js');

const router = Router();

const { VIDEOJUEGOS_SOLICITADOS, buildPlatforms2, getApiVideogames, getDbVideogames } = require('./index.js');

// Ruta para pedir videojuegos de la api y de la bd desde el front. 
// Si no se le pasa query trae 100 videojuegos.
// Si se le pasa name por query se trae como máximo 15 videojuegos que contengan el name.
router.get("/", async (req, res) => {
    const {name} = req.query;
    let apiVideogames = await getApiVideogames();
    let dbVideogames = await getDbVideogames();
    if (name) {
        let allVideogames = [...apiVideogames, ...dbVideogames];
        let nameVideogames = allVideogames.filter(videogame => videogame.name.toLowerCase().includes(name.toLowerCase()))
        nameVideogames.length ? 
        res.status(200).send(nameVideogames.slice(0, VIDEOJUEGOS_SOLICITADOS)) :
        res.status(404).send("Not found videogames");
    } else {
        let allVideogames = [...apiVideogames.slice(0, apiVideogames.length - dbVideogames.length), ...dbVideogames];
        res.status(200).send(allVideogames);
    }
})

// Ruta para crear un nuevo videojuego en la bd.
router.post("/", async (req, res) => {
    try {
        let {name, released, rating, platforms, genres, description_raw, background_image} = req.body;
        platforms = buildPlatforms2(platforms);
        let newVideogame = await Videogame.create({name, released, rating, platforms, description_raw, background_image});
        let genreDb = await Genre.findAll({where:{name:genres}});
        newVideogame.addGenre(genreDb);
        res.status(200).send("Videogame was created");
    } catch (error) {
        res.status(400).send("Videogame was not created");
    }
})

module.exports = router;
