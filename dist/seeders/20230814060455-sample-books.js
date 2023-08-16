"use strict";
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Books', [
            {
                id: 1,
                title: 'Forest Gump',
                authorId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('Books', null, {});
    },
};
