import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import AuthLoadingScreen from './screens/AuthLoadingScreen'
import Buscar from './screens/buscar'
import Home from './screens/home'
import Inicio from './screens/inicio'
import Login from './screens/login'
import { CriarPrato, VerPrato, EditarPrato } from './screens/prato'
import Signup from './screens/signup'
import { Perfil } from './screens/usuario'
import AlterarDados from './screens/usuario/alterarDados'

const stackNavigationOptions = {
  transitionConfig: () => ({ screenInterpolator: () => null }),
  headerLayoutPreset: 'center',
  defaultNavigationOptions: () => ({
    headerTitleStyle: {
      color: '#FFF',
      flex: 1,
    },
    headerStyle: {
      backgroundColor: '#0f3163',
    },
    headerTintColor: '#fff',
  }),
}

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
    navigationOptions: {
      transitionConfig: () => ({ screenInterpolator: () => null }),
    },
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
)

const AuthStack = createStackNavigator(
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
  },
  stackNavigationOptions
)

const AppStack = createStackNavigator(
  {
    TabNavigator: {
      screen: BottomTabNavigator,
      navigationOptions: {
        header: null,
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
    AlterarDados: {
      screen: AlterarDados,
      navigationOptions: {
        title: 'Alterar dados',
      },
    },
  },
  stackNavigationOptions
)

const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default createAppContainer(AppSwitchNavigator)
