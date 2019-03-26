'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actions = sequelize.define('Actions', {
    actionId: {type:DataTypes.INTEGER, primaryKey:true},
    userId: {type:DataTypes.INTEGER, references: 'users', referencesKey: 'userID' },
    canvasId: {type:DataTypes.INTEGER, references: 'canvases', referencesKey: 'canvasId' },
    svgPath: DataTypes.STRING,
    time: DataTypes.DATE,
    sessionId: {type:DataTypes.INTEGER, references:'sessions', referencesKey:'sessionId'}
  }, {timestamps: false});

  return Actions;
};