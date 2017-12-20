'use strict';

module.exports = function (sequelize, Sequelize) {
  const ToNote = sequelize.define('ToNote', {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    note_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'note',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    marker_description_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'marker_description',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'to_note'
  });

  ToNote.associate = function (models) {
    ToNote.belongsTo(models.User, { foreignKey: 'user_id' });
    ToNote.belongsTo(models.MarkerDescription, { foreignKey: 'marker_description_id' });
    ToNote.belongsTo(models.Note, { foreignKey: 'note_id' });
  };


  return ToNote;
};
