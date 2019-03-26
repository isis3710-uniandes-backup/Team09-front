'use strict';
module.exports = (sequelize, DataTypes) => {
  const Canvases = sequelize.define('Canvases', {
    canvasId: {type:DataTypes.INTEGER, primaryKey:true},
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    roomId: {type:DataTypes.INTEGER, references: 'rooms', referencesKey: 'roomId' }
  }, {timestamps: false});

  return Canvases;
};