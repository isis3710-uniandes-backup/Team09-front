'use strict';
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    id: {type:DataTypes.INTEGER, primaryKey:true},
    name: DataTypes.STRING
  }, {timestamps: false});

  return Groups;
};
module.exports = (sequelize, DataTypes) => {
  const UsersInGroups = sequelize.define('UsersinGroups', {
    uogId: {type:DataTypes.INTEGER, primaryKey:true},
    groupId: {type:DataTypes.INTEGER, references: 'groups', referencesKey: 'id' },
    userId: {type:DataTypes.INTEGER, references: 'users', referencesKey: 'userID' },
    isAdmin: DataTypes.BOOLEAN
  }, {timestamps: false});

  return UsersInGroups;
};