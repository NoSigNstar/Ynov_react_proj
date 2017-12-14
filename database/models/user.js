'use strict';

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    api_token: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      max: 20,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        max: 30,
        notEmpty: true
      }
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Users',
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message, { foreignKey: 'user_id' });
        User.hasMany(models.ToNote, { foreignKey: 'user_id' });
        User.hasMany(models.Route, { foreignKey: 'user_id' });
      }
    }
  });
  return User;
};
