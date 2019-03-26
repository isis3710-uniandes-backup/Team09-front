'use strict';
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    id: {type:DataTypes.INTEGER, primaryKey:true},
    name: DataTypes.STRING
  }, {timestamps: false});

  return Groups;
};
