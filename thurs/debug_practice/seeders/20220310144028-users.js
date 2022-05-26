'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
    {
      name: 'Alec',
      email: 'alec@alec.alec',
      password: 'iamalec',
      favoriteThing: 7
    },
    {
      name: 'Dan',
      email: 'dan@dan.dan',
      password: 'iamdan',
      favoriteThing: 4
    },
    {
      name: 'Rawaha',
      email: 'rawaha@rawaha.rawaha',
      password: 'iamrawaha',
      favoriteThing: 5
    },
    {
      name: 'Ray',
      email: 'ray@ray.ray',
      password: 'iamray',
      favoriteThing: 2
    },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
