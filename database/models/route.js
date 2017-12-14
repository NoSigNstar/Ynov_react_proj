'use strict';

module.exports = function (sequelize, Sequelize) {
  const Route = sequelize.define('Route', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    token: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'route',
    classMethods: {
      associate: (models) => {
        Route.belongsTo(models.Users, { foreignKey: 'user_id' });
        Route.hasMany(models.ToRoute, { foreignKey: 'route_id' });
      }
    }
  });

  return Route;
};
