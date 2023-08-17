"use strict";
module.exports = {
    up: async (queryInterface, DataTypes) => {
        // Add a new column "new_dob"
        await queryInterface.addColumn('Authors', 'dob', {
            type: DataTypes.DATE,
            allowNull: false
        });
        await queryInterface.sequelize.query(`
      UPDATE "Authors" SET "dob" = to_timestamp("age")::date;
    `);
        await queryInterface.removeColumn('Authors', 'age');
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.addColumn('Authors', 'age', {
            type: DataTypes.INTEGER,
            allowNull: false
        });
        await queryInterface.sequelize.query(`
      UPDATE "Authors" SET "age" = EXTRACT(YEAR FROM "dob");
    `);
        await queryInterface.removeColumn('Authors', 'dob');
    },
};
