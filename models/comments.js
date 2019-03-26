'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    commentId: {type:DataTypes.INTEGER, primaryKey:true},
    canvasId: {type:DataTypes.INTEGER, references: 'canvases', referencesKey: 'canvasId' },
    comm: DataTypes.STRING,
    user: DataTypes.STRING
  }, {timestamps: false});

  return Comments;
};