import { lazy, Suspense } from 'react';
import { BrowserRouter } from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './App.css';
import {Navigation} from './navigation';

// apollo client
const client = new ApolloClient({
  uri: `https://1cd2-49-204-165-45.in.ngrok.io/graphql`,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
