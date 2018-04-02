import configVar from './configVar'
import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native'
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const httpLink = createHttpLink({ uri: `${configVar.httpLink}/graphql` });
//const httpLink = createHttpLink({ uri: 'https://sportsagentapp.herokuapp.com/graphql' });
//const httpLink = createHttpLink({ uri: Config.HTTPLINK });

const middlewareLink = setContext(async () => {
  const token = await AsyncStorage.getItem('jwtToken')
  return {
    headers: { 
      authorization: token || null
    }
  }
});

const wsLink = new WebSocketLink({
  uri: `${`${configVar.httpLink}/subscriptions`}`,
  options: {
    reconnect: true,
  }
});

const link = middlewareLink.concat(httpLink)

const linkSplit = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  link,
);

const client = new ApolloClient({
    link: linkSplit,
    cache: new InMemoryCache({ dataIdFromObject: object => object._id }),
    connectToDevTools: true,
});


export default client