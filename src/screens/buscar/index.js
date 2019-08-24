import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from 'react-navigation'

import BuscaNormal from './buscaNormal'
import BuscaAvancada from './buscaAvancada';

export default createMaterialTopTabNavigator(
  {
    BuscaNormal: {
      screen: BuscaNormal,
      navigationOptions: {
        tabBarLabel: 'BUSCA NORMAL',
        tabBarIcon: ({ tintColor }) => <Icon name="search" size={18} color={tintColor} />,
      },
    },
    BuscaAvancada: {
      screen: BuscaAvancada,
      navigationOptions: {
        tabBarLabel: 'BUSCA AVANÇADA',
        tabBarIcon: ({ tintColor }) => <Icon name="search-plus" size={18} color={tintColor} solid />,
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
