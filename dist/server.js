"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./graphql/schema");
const resolver_1 = require("./graphql/resolver");
const connection_1 = require("./config/connection");
const initApp = async () => {
    await connection_1.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const server = new server_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolver_1.resolvers });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 }
    });
    console.log(`Server running: ${url}`);
};
initApp();
