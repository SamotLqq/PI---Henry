const { Router } = require('express');

const router = Router();

const { CARACTER_UUID, getApiById, getDbById } = require('./index.js');
const SLUG_VACIAR_DETALLE = 0;

// Ruta para pedir descripción de videojuego de la api y de la bd desde el front.
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        if (id == SLUG_VACIAR_DETALLE) {
            return res.status(200).send({});
        }
        else if (!id.includes(CARACTER_UUID)) {
            let apiDescription = await getApiById(id);
            return res.status(200).send(apiDescription);
        }
        else {
            let dbDescription = await getDbById(id);
            return res.status(200).send(dbDescription);
        }
    }
    catch (error) {
        res.status(404).send("Not found description");
    }
})

module.exports = router;

