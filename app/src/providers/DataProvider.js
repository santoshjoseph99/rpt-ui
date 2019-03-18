import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

// TODO: via env configs
const WS_URL = 'ws://localhost:4000';
const HTTP_URL = 'http://localhost:4000';

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: HTTP_URL
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
