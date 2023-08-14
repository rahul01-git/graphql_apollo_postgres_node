import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolver'

const initApp = async () =>{

    const server = new ApolloServer({ typeDefs, resolvers })
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    })
    
    console.log(`Server running: ${url}`)
}
initApp()