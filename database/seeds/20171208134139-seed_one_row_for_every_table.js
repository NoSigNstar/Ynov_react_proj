'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Note', [
        { note: 1, type: 'general'},
        { note: 2, type: 'general'},
        { note: 3, type: 'general'},
        { note: 4, type: 'general'},
        { note: 5, type: 'general'}
      ], {}),
      queryInterface.bulkInsert('Marker', [{
        distance: 4,
        longitude: 51.25132132,
        latitude: 51.213123,
        color: 541541,
        time: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }], {}).then(() => {
        return queryInterface.bulkInsert('Marker_Description', [{
          description: 'Bla bla bla bla',
          marker_id: 1
        }], {}).then(() => {
          return [
            queryInterface.bulkInsert('Marker_Picture', [{
              picture: 'http://i.huffpost.com/gen/3902996/images/n-SQDSQ-large570.jpg',
              marker_description_id: 1
            }, {
              picture: 'https://t3.ftcdn.net/jpg/00/04/16/26/240_F_4162609_QJXYa3Mys5mdhgQS0mfEa4aHXtDoTukj.jpg',
              marker_description_id: 1
            }], {}),
            queryInterface.bulkInsert('Room', [{
              name: 'Test',
              marker_description_id: 1
            }])
          ];
        });
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.bulkDelete('Note', null, {}),
      queryInterface.bulkDelete('Marker', null, {}),
      queryInterface.bulkDelete('MarkerDescription', null, {}),
      queryInterface.bulkDelete('MarkerPicture', null, {}),
      queryInterface.bulkDelete('Room', null, {})
    ];
  }
};
