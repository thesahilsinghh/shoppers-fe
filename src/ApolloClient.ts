import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
