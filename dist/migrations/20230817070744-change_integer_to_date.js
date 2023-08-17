"use strict";
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.addColumn('Authors', 'dob', {
            type: DataTypes.DATE,
        });
        await queryInterface.sequelize.query(`
    UPDATE "Authors"
    SET "dob" = DATE_TRUNC('year', current_date) - ("age" || ' years')::interval

    `);
        await queryInterface.removeColumn('Authors', 'age');
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.addColumn('Authors', 'age', {
            type: DataTypes.INTEGER,
        });
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        await queryInterface.sequelize.query(`
      UPDATE "Authors" SET "age" = ${currentYear} - EXTRACT(YEAR FROM "dob");
    `);
        await queryInterface.removeColumn('Authors', 'dob');
    },
};
