"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_1 = require("./graphql");
const config_1 = require("./config");
const initApp = async () => {
    await config_1.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const server = new server_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: async ({ req }) => ({ req })
    });
    console.log(`Server running: ${url}`);
};
initApp();
