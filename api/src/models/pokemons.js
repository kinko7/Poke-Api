const { DataTypes } = require("sequelize");


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Pokemons",
    {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      img: {
        type: DataTypes.TEXT
      },
      attack: {
        type: DataTypes.INTEGER
      },
      defense: {
        type: DataTypes.INTEGER
      },
      speed: {
        type: DataTypes.INTEGER
      },
      height: {
        type: DataTypes.INTEGER
      },
      weight: {
        type: DataTypes.INTEGER
      },
      hp: { 
        type:DataTypes.INTEGER
      },
       
    },
    { timestamps: false },
    { updatedAt: false },
    { createdAt: false }
  );
};

