const faker = require('faker');
const bcryptjs = require('bcryptjs');
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   let users = [];
    let passwordHash = bcryptjs.hashSync('secret', 10);

  for (let i = 1; i < 20; i++) {
    users = [
      ...users,
      {
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
