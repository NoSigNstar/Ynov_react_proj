'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING,
      defaultValue: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'avatar');
  }
};
