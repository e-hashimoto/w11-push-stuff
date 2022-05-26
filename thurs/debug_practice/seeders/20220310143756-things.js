'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Things', [
     {
       nameOfThing: "Naps"
     },
     {
       nameOfThing: "Petting Dogs"
     },
     {
       nameOfThing: "Ice Cream"
     },
     {
       nameOfThing: "Raves"
     },
     {
       nameOfThing: "Deep Sea Diving"
     },
     {
       nameOfThing: "Snowball Fights"
     },
     {
       nameOfThing: "Warm Socks"
     },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Things', null, {});
  }
};
