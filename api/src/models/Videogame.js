const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: { // mayor que 0 menor que 5
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
