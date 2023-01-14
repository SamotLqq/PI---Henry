const { Router } = require('express');

const router = Router();

const { getApiPlatforms } = require('./index.js');

// Ruta para guardar las plataformas de videojuegos. 
router.get("/", async(req, res) => {
    try {
        let platforms = await getApiPlatforms();
        platforms = platforms.map(platform => {
            return {name : platform}
        })
        res.status(200).send(platforms);
    } catch (error) {
        res.status(404).send("Plataformas no encontradas.");
    }

})

module.exports = router;