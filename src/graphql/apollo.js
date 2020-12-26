import {
    ApolloClient, InMemoryCache, HttpLink
} from '@apollo/client'

const createApolloClient = () => new ApolloClient({
    link: new HttpLink({
        uri: 'https://liquor.herokuapp.com/v1/graphql'
    }),
    cache: new InMemoryCache(),
})

export { createApolloClient }