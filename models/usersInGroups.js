'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersInGroups = sequelize.define('UsersInGroups', {
    uogId: {type:DataTypes.INTEGER, primaryKey:true},
    groupId: {type:DataTypes.INTEGER, references: 'groups', referencesKey: 'id' },
    userId: {type:DataTypes.INTEGER, references: 'users', referencesKey: 'userID' },
    isAdmin: DataTypes.BOOLEAN
  }, {timestamps: false});


  return UsersInGroups;
};