import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ApolloClient from "apollo-client";
import "./stylesheets/output.css"
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
// import { persistCache } from 'apollo-cache-persist';
import { setContext } from "apollo-link-context";
import { HashRouter } from 'react-router-dom';

import Mutations from './graphql/mutations';
import Queries from './graphql/queries';
const { GET_USER_ID } = Queries;
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

// try {
//   // See above for additional options, including other storage providers.
//   persistCache({
//     cache,
//     storage: window.localStorage,
//   });
// } catch (error) {
//   console.error('Error restoring Apollo cache', error);
// }

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
  resolvers: {},
});

const token = localStorage.getItem("auth-token");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
        }
      })
    });
};


const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};


ReactDOM.render(<Root />, document.getElementById('root'));


