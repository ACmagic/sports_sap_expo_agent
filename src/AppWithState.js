import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './navigators';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
const addListener = createReduxBoundAddListener('root');

const AppWithNavigationState = ({ dispatch, nav }) => <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />;

const mapStateToProps = state => ({ authUser: state.auth.jwt, nav: state.nav });

export default connect(mapStateToProps)(AppWithNavigationState);