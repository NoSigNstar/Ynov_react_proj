'use strict';

module.exports = function (sequelize, Sequelize) {
  const MarkerDescription = sequelize.define('MarkerDescription', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    open_hours: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    },
    marker_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'marker',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'marker_description',
    classMethods: {
      associate: (models) => {
        MarkerDescription.belongsTo(models.Marker, { foreignKey: 'marker_id' });
        MarkerDescription.hasMany(models.MarkerPicture, { foreignKey: 'marker_description_id' });
        MarkerDescription.hasMany(models.Route, { foreignKey: 'marker_description_id' });
        MarkerDescription.hasOne(models.Room, { foreignKey: 'marker_description_id' });
        MarkerDescription.hasMany(models.ToNote, { foreignKey: 'marker_description_id' });
      }
    }
  });

  return MarkerDescription;
};
