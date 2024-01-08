'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Properties', [
      {
        name: 'Sky Heights',
        location: 'Mumbai',
        availablefrom: "2022-07-10 11:00:55",
        price: 70000,
        type: 'flat',
        amenities: '3 Bedroom,2 Bathroom,Fully Furnished',
        carpetArea: '1000 sqft',
        ownerId: 1,
        createdAt: new Date('2023-12-05T19:15:16.000Z'),
        updatedAt: new Date('2023-12-05T19:23:06.000Z'),
      },
      {
        name: 'Dream Land',
        location: 'Bengaluru',
        availablefrom: "2022-08-10 11:00:55",
        price: 90000,
        type: 'flat',
        amenities: '3 Bedroom,2 Bathroom,Fully Furnished',
        carpetArea: '1000 sqft',
        ownerId: 3,
        createdAt: new Date('2023-12-05T20:03:16.000Z'),
        updatedAt: new Date('2023-12-05T20:03:16.000Z'),
      },
      {
        name: 'Galaxy Heights',
        location: 'Delhi',
        availablefrom: "2022-09-10 11:00:55",
        price: 100000,
        type: 'villa',
        amenities: '3 Bedroom,2 Bathroom,Fully Furnished',
        carpetArea: '10000 sqft',
        ownerId: 2,
        createdAt: new Date('2023-12-05T20:04:33.000Z'),
        updatedAt: new Date('2023-12-05T20:04:33.000Z'),
      },
      {
        name: 'Manas Society',
        location: 'Mumbai',
        availablefrom: "2022-10-10 11:00:55",
        price: 100000,
        type: 'flat',
        amenities: '3 Bedroom,2 Bathroom,Fully Furnished',
        carpetArea: '1000sqft',
        ownerId: 4,
        createdAt: new Date('2023-12-05T20:07:11.000Z'),
        updatedAt: new Date('2023-12-05T20:07:11.000Z'),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Properties', null, {});
  }
};
