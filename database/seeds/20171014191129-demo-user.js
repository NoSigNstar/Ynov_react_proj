'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert('Users', [{
      login: 'JohnLog',
      first_name: 'John',
      last_name: 'Doe',
      email: 'jone.doe@localhost.com',
      avatar: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      password: '123456789',
      api_token: 'demo',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    // reverting commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete('Users', null, {});
  }
};
