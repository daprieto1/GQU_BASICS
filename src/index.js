import { GraphQLServer } from 'graphql-yoga'
import { Query, Mutation, Post, User, Picture } from './graphql/resolvers'

const server = new GraphQLServer({
    typeDefs: './src/graphql/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Post,
        User,
        Picture
    }
})

server.start( () => {
    console.log('Running!')
})