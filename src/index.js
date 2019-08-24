import React from 'react';
import { InteractionManager } from 'react-native';
import { Provider } from 'react-redux';

import actions from './redux/actions/UsuarioActionCreator';
import AppContainer from './routes';
import store from './store';
import AsyncStorage from './util/AsyncStorage';
import NavigationService from './util/NavigationService';

export default class App extends React.Component {
  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        store.dispatch(actions.renewUsuario());
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
