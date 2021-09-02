import {GraphQLServer} from 'graphql-yoga'

const server = new GraphQLServer({
    typeDefs:`
        type Query {
            agent: User!
            agents: [User]
        }
        
        type User {
            id: ID!
            name: String!
            age: Int
            married: Boolean
            average: Float
        }
    `,
    resolvers:{
        Query: {
            agent() {
                return {
                    id: 1,
                    name: 'Diego',
                    age: 27,
                    married: false,
                    average: 4.5
                }
            },
            agents() {
                return [
                    {
                        id: 1,
                        name: 'Diego',
                        age: 27,
                        married: false,
                        average: 4.5
                    },
                    {
                        id: 2,
                        name: 'Alfonso',
                        age: 28,
                        married: false,
                        average: 4.5
                    }
                ]
            }
        }
    }
})

server.start( () => {
    console.log('Running!')
})