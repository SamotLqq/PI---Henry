const { conn, Genre } = require('../src/db');

describe('Genre Model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  describe('Test: ', () => {
    it('No deberia crear el género si no se le envia el nombre.', async () => {
      expect.assertions(1);
      try {
        await Genre.create({});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('Debe crear el género si todas las propiedades requeridas son enviadas.', async () => {
      const genre = await Genre.create({name: '3D'});
      expect(genre.toJSON()).toHaveProperty('name','3D');
    });

    it('No debe crear géneros con el mismo nombre.', async () => {
      expect.assertions(2);
      try {
        const firstGenre = await Genre.create({name:'2D'});
        expect(firstGenre.toJSON()).toEqual({
          name: '2D',
        });
        await Genre.create({name: '2D'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    })
  })

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
});