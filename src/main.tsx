import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorLink } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";


const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
)
