import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from 'react-navigation'

import Favoritos from './favoritos'
import Feed from './feed';

export default createMaterialTopTabNavigator(
  {
    Pratos: {
      screen: Feed,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="utensils" size={18} color={tintColor} />,
      },
    },
    Favoritos: {
      screen: Favoritos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="star" size={18} color={tintColor} solid />,
      },
    },
  },
  {
    lazy: true,
    optimizationsEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#0f3163',
      },
      labelStyle: {
        fontSize: 11,
        margin: 0,
        padding: 0,
      },
      activeTintColor: '#FFF',
      inactiveTintColor: 'rgba(255, 255, 255, 0.35)',
      indicatorStyle: {
        backgroundColor: '#3284ff',
      },
      showIcon: true,
    },
  }
);
