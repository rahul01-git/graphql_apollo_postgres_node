import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolver'
import { sequelize } from './config/connection'

const initApp = async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
      });
      

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({req}) => ({req})
    });

    console.log(`Server running: ${url}`);
}
initApp();
