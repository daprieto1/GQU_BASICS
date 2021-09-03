import {GraphQLServer} from 'graphql-yoga'
import axios from 'axios'

const db = 'http://localhost:3004/'
const server = new GraphQLServer({
    typeDefs:`
        type Query {
            agent(id: Int!): User!
            agents(name: String, age: Int): [User!]!
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
            agent: async (parent, args) => {
                const response = await axios.get(`${db}users/${args.id}`)
                return response.data
            },
            agents: async (parent, args) => {
                const name = args.name != null ? `name=${args.name}` : ''
                const age = args.age != null ? `age=${args.age}` : ''

                const response = await axios.get(`${db}users?${name}&${age}`)
                return response.data
            },
        }
    }
})

server.start( () => {
    console.log('Running!')
})