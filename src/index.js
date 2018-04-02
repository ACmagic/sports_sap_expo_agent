import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './apolloClient'
import { Text, View, StatusBar } from 'react-native';
import AppNavigator from './navigators';
import configureStore from './configureStore';
import AppWithNavigationState from './AppWithState'

const { store, persistor } = configureStore();

const Loading = () => <View style={{ flex: 1, backgroundColor: 'black' }}><Text>loading</Text></View>;

const onBeforeLift = () => null;
class Main extends Component {
	render() {
		return (
            <ApolloProvider client={apolloClient}>
				<Provider store={store}>
					<PersistGate persistor={persistor} loading={<Loading/>} onBeforeLift={onBeforeLift}>
						<StatusBar barStyle="light-content"/>
						<AppWithNavigationState/>
					</PersistGate>
				</Provider>
            </ApolloProvider>
		);
	}
}

export default Main;