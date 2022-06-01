"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "EntreeTypes",
      [
        {
          name: "Beef",
          isVegetarian: false,
          createdAt: "2019-04-12",
          updatedAt: "2019-04-12",
        },
        {
          name: "Chicken",
          isVegetarian: false,
          createdAt: "2019-04-12",
          updatedAt: "2019-04-12",
        },
        {
          name: "Goat",
          isVegetarian: false,
          createdAt: "2019-04-12",
          updatedAt: "2019-04-12",
        },
        {
          name: "Jackfruit",
          isVegetarian: true,
          createdAt: "2019-04-12",
          updatedAt: "2019-04-12",
        },
        {
          name: "Plant-based",
          isVegetarian: true,
          createdAt: "2019-04-12",
          updatedAt: "2019-04-12",
        },
        {
          name: "Pork",
          isVegetarian: false,
          createdAt: "2019-04-12",
          updatedAt: "2019-04-12",
        },
        {
          name: "Soy",
          isVegetarian: true,
          createdAt: "2019-04-12",
          updatedAt: "2019-04-12",
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("EntreeTypes", null, {});
  },
};
