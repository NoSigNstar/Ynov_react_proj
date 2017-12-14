'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    content: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'room',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'restrict'
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'message',
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Users, { foreignKey: 'user_id' });
        Message.belongsTo(models.Room, { foreignKey: 'room_id' });
      }
    }
  });
  return Message;
};
