import React from 'react'
import { Provider } from 'react-redux'

import AppContainer from './routes'
import store from './store'
import NavigationService from './util/NavigationService'

export default () => (
  <Provider store={store}>
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}
    />
  </Provider>
)
