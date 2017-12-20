'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Note', 'type', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('Room', 'name', {
        type: Sequelize.STRING
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.changeColumn('Note', 'type', {
        type: Sequelize.INTEGER
      }),
      queryInterface.changeColumn('Room', 'name', {
        type: Sequelize.INTEGER
      })
    ];
  }
};
