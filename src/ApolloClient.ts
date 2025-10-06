import { ApolloClient, HttpLink, InMemoryCache,from } from "@apollo/client";

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink])
});

export default client;
