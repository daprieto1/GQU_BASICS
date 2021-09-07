import axios from "axios";

const db = 'http://localhost:3004/'

const Query = {
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
    posts: async () => {
        const response = await axios.get(`${db}posts`)
        return response.data
    },
    post: async(parent, args) => {
        const response = await axios.get(`${db}posts/${args.id}`)
        return response.data
    },
    pictures: async () => {
        const response = await axios.get(`${db}pictures`)
        return response.data
    }
}

const Mutation = {
    createAgent: async (parent, args) => {
        const response = await axios.post(`${db}users`, {
            name: args.name,
            age: args.age,
            married: args.married,
            average: 0,
        })
        return response.data
    },
    createPost: async (parent, args) => {
        // get token
        const userId = 1

        // get picture
        const pictureId = 1

        const response = await axios.post(`${db}posts`, {
            title: args.title,
            content: args.content,
            author: userId,
            picture: pictureId,
        })
        return response.data
    },
    deletePost: async (parent, args) => {
        const response = await axios.delete(`${db}posts/${args.id}`)
        return Object.keys(response.data).length === 0
    },
    deleteAgent: async () => {
        // find all posts and delete them
        // find all pictures and delete them
        const response = await axios.delete(`${db}users/${args.id}`)
        return Object.keys(response.data).length === 0
    }
}

const Post = {
    author: async (parent) => {
        const response = await axios.get(`${db}users/${parent.author}`)
        return response.data
    },
    picture: async (parent) => {
        const response = await axios.get(`${db}pictures/${parent.picture}`)
        return response.data
    },
}

const User =  {
    posts: async (parent) => {
        const response = await axios.get(`${db}posts?author=${parent.id}`)
        return response.data
    },
    pictures: async (parent) => {
        const response = await axios.get(`${db}pictures?author=${parent.id}`)
        return response.data
    }
}

const Picture = {
    author: async (parent) => {
        const response = await axios.get(`${db}users/${parent.author}`)
        return response.data
    },
    post: async (parent) => {
        const response = await axios.get(`${db}posts/${parent.post}`)
        return response.data
    }
}

export {
    Query,
    Mutation,
    Post,
    User,
    Picture
}