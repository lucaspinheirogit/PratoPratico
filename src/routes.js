import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import Buscar from './screens/buscar';
import Inicio from './screens/inicio'
import Home from './screens/home';
import Login from './screens/login';
import SignupTeste from './screens/signup';
import { CriarPrato, VerPrato, EditarPrato } from './screens/prato';
import {
  Signup, Perfil, AlterarDados
} from './screens/usuario';


const BottomTabNavigator = createBottomTabNavigator(
  {
    Início: {
      screen: Inicio,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />,
      },
    },
    Buscar: {
      screen: Buscar,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="search" size={20} color={tintColor} />,
      },
    },
    Perfil: {
      screen: Perfil,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="user" size={20} color={tintColor} solid />,
      },
    },
  },
  {
    lazy: true,
    optimizationsEnabled: true,
    tabBarOptions: {
      showLabel: false,
      labelStyle: {
        fontSize: 11,
        margin: 0,
        padding: 0,
        width: '100%',
      },
      showIcon: true,
      activeTintColor: '#FFF',
      activeBackgroundColor: '#113870',
      inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
      style: {
        backgroundColor: '#0d2b56',
      },
    },
  }
);

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'BEM-VINDO!',
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'LOGIN',
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        title: 'CADASTRO',
      },
    },
    AlterarDados: {
      screen: AlterarDados,
      navigationOptions: {
        title: 'Alterar dados',
      },
    },
    AddPrato: {
      screen: CriarPrato,
      navigationOptions: {
        title: 'Criar Prato',
      },
    },
    VerPrato: {
      screen: VerPrato,
      navigationOptions: {
        title: 'Ver Prato',
      },
    },
    EditarPrato: {
      screen: EditarPrato,
      navigationOptions: {
        title: 'Editar Prato',
      },
    },
    TabNavigator: {
      screen: BottomTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        color: '#FFF',
        flex: 1,
      },
      headerStyle: {
        backgroundColor: '#305c9b',
      },
      headerTintColor: '#fff',
    }),
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    SignupTeste,
    // StackNavigator,
  },
  {}
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
