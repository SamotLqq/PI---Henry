const { Router } = require('express');
const { Genre} = require('../db.js');

const router = Router();

const { getApiGenres } = require('./index.js');

// Ruta para guardar los géneros en la bd.
router.get("/", async (req, res) => {
    try {
        let genres = await getApiGenres();
        for (let i = 0; i < genres.length; i++) {
            const genre = genres[i];
            Genre.findOrCreate({
                where: {name: genre.name}
            })
        }
        res.status(200).send(genres);
    } catch (error) {
        res.status(404).send("Géneros no encontrados.");
    }

})

module.exports = router;
