import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { Toaster } from 'sonner';


const client = new ApolloClient({
  cache:new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graph-erotikfy.onrender.com/",
    
    credentials: 'include',
  })
})


createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster position="top-center" richColors />
  </ApolloProvider>
)
