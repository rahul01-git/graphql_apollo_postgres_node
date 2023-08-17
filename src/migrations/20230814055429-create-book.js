module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Books', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      authorId: {
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
    await queryInterface.dropTable('Books');
  }
};
