import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:3000/api",
    credentials: 'include'
  })
})


createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>
)
