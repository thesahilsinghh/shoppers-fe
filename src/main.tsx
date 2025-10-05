import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient,HttpLink,InMemoryCache,gql } from '@apollo/client'

// const client = new ApolloClient({
//   uri:"http://localhost:3000/graphql/",
//   cache:new InMemoryCachen(),
//   credintials:"includes"
// })

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <ApolloProvider> */}
      <App />
    {/* </ApolloProvider> */}
  </BrowserRouter>,
)
