import React from 'react'
import { Provider } from 'react-redux'

import AppContainer from './routes'
import store from './store'
import NavigationService from './util/NavigationService'

/* eslint no-undef: 0, import/no-extraneous-dependencies: 0 */
if (__DEV__) require('react-devtools')

export default () => (
  <Provider store={store}>
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}
    />
  </Provider>
)
