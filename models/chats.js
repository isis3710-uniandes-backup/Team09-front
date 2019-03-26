'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define('Chats', {
    chatId: {type:DataTypes.INTEGER, primaryKey:true},
    roomId: {type:DataTypes.INTEGER, references: 'rooms', referencesKey: 'roomId' }
  }, {timestamps: false});

  return Chats;
};