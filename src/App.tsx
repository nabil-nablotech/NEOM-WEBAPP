import { lazy, Suspense } from 'react';
import { BrowserRouter } from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './App.css';
import './variables.css';
import {Navigation} from './navigation';
import FallbackComponent from './components/Common/FallbackComponent';
import ErrorBoundary from './components/ErrorBoundary';

// apollo client
const client = new ApolloClient({
  uri: `https://1cd2-49-204-165-45.in.ngrok.io/graphql`,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <div className="App">
          <BrowserRouter>
            <Suspense fallback={<FallbackComponent />}>

            <Navigation />
          </Suspense>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
