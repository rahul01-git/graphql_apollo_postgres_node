"use strict";
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Authors', [
            {
                id: 1,
                name: 'ZOD',
                age: 23,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('Authors', null, {});
    },
};
