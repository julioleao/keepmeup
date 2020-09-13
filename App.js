import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProjectPage from './src/screens/ProjectPage';
import TaskDetail from './src/screens/TaskDetail';
import TaskPage from './src/screens/TaskPage';
import capitalizeFirstLetter from './src/util/CapitalizeFirstLetter';
import LoginScreen from './src/screens/LoginScreen';
import TeamPage from './src/screens/TeamPage';
import ProjectDetail from './src/screens/ProjectDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewTask from './src/screens/NewTask';
import NewProject from './src/screens/NewProject';

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Bem vindo',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: 'white',
        fontSize: 22,
        flexGrow: 1,
        textAlign: 'center',
      },
      headerStyle: {
        backgroundColor: '#6f00ff',
        borderBottomWidth: 1,
        borderBottomColor: '#C5C5C5',
      },
    },
  },
);

const StackNavigator = createStackNavigator(
  {
    Main: {
      screen: TaskPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    TaskDetail: {
      screen: TaskDetail,
      navigationOptions: ({navigation}) => {
        const taskName = navigation.state.params.task.name;

        return {
          title: capitalizeFirstLetter(taskName),
        };
      },
    },
    ProjectDetail: {
      screen: ProjectDetail,
      navigationOptions: ({navigation}) => {
        const taskName = navigation.state.params.task.name;

        return {
          title: capitalizeFirstLetter(taskName),
        };
      },
    },
    ProjectPage: {
      screen: ProjectPage,
      navigationOptions: ({navigation}) => {
        const taskName = navigation.state.params.task.name;

        return {
          title: capitalizeFirstLetter(taskName),
        };
      },
    },
    NewTask: {
      screen: NewTask,
      navigationOptions: {
        title: 'NOVA TAREFA',
      },
    },
    NewProject: {
      screen: NewProject,
      navigationOptions: {
        title: 'NOVO PROJETO',
      },
    },
  },

  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: 'white',
        fontSize: 22,
        flexGrow: 1,
        textAlign: 'center',
      },
      headerStyle: {
        backgroundColor: '#6f00ff',
        borderBottomWidth: 1,
        borderBottomColor: '#C5C5C5',
      },
    },
  },
);

const TabNavigator = createBottomTabNavigator({
  Projetos: {
    screen: StackNavigator,
  },
  Time: {
    screen: TeamPage,
  },
});

const RootNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  App: TabNavigator,
});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
