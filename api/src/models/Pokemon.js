const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
      },
    hp: { type: DataTypes.INTEGER, defaultValue: null },
    attack: { type: DataTypes.INTEGER, defaultValue: null },
    defense: { type: DataTypes.INTEGER, defaultValue: null },
    speed: { type: DataTypes.INTEGER, defaultValue: null },
    height: { type: DataTypes.INTEGER, defaultValue: null },
    weight: { type: DataTypes.INTEGER, defaultValue: null },
    img: { type: DataTypes.STRING, defaultValue: null }
  },{
    timestamps: false
  });
};