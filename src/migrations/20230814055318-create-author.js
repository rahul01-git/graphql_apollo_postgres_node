module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Authors', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Authors');
  }
};
