const { conn, Videogame } = require('../src/db');

describe('Videogame Model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    console.log('Franco');
  });

  describe('Test: ', () => {
    it('No deberia crear el videojuego si no se le pasa el nombre, la descripción o las plataformas', async () => {
      expect.assertions(3);
      try {
        await Videogame.create({name: "juego1", description_raw: "sin plataformas"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
      try {
        await Videogame.create({name: "sin descripción", platforms: "ps3, ps4"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
      try {
        await Videogame.create({description_raw: "sin nombre", platforms: "ps3, ps4"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
  it('No deberia crear el videojuego si rating es menor que 0 o mayor que 5', async () => {
      expect.assertions(2);
      try {
        await Videogame.create({name: '-', rating: -1, description_raw: "-", platforms: "-"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
      try {
        await Videogame.create({name: '-', rating: 6, description_raw: "-", platforms: "-"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('Deberia crear el videojuego si todos los campos requeridos estan completos y son válidos.', async () => {
      const videogame = await Videogame.create({name: 'juego1', rating: 3, description_raw: "prueba1", platforms: "ps3, ps4, pc"})
      expect(videogame.toJSON().name).toBe('juego1');
      expect(videogame.toJSON().rating).toBe(3);
      expect(videogame.toJSON().description_raw).toBe('prueba1');
      expect(videogame.toJSON().platforms).toBe('ps3, ps4, pc');
    });
  
    it('No deberia poder crear el videojuego si ya hay otro con el mismo nombre.', async () => {
      expect.assertions(1);
      try {
        await Videogame.create({name: 'First', rating: 4.5, description_raw: "-", platforms: "-"})
        await Videogame.create({name: 'First', rating: 4, description_raw: "otra desc", platforms: "otras plat"});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
});