'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    roomId: {type:DataTypes.INTEGER, primaryKey:true},
    name: DataTypes.STRING,
    groupId: {type:DataTypes.INTEGER, references: 'groups', referencesKey: 'id' }
  }, {timestamps: false});

  return Rooms;
};