const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Types', {
    id: {
      type: DataTypes.INTEGER,
      // foreignKey:"typId", //dos prop de estas se van a relacionar
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    }

  },
    { timestamps: false },
    { updatedAt: false },
    { createdAt: false }
  );
};

