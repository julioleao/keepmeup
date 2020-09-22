import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProjectPage from './screens/ProjectPage';
import TaskDetail from './screens/TaskDetail';
import TaskPage from './screens/TaskPage';
import capitalizeFirstLetter from './util/CapitalizeFirstLetter';
import LoginScreen from './screens/LoginScreen';
import TeamPage from './screens/TeamPage';
import ProjectDetail from './screens/ProjectDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewTask from './screens/NewTask';
import NewProject from './screens/NewProject';

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

const TeamNavigator = createStackNavigator(
  {
    Team: {
      screen: TeamPage,
      navigationOptions: {
        headerShown: false,
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
      screen: ProjectPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    TaskDetail: {
      screen: TaskDetail,
      navigationOptions: ({navigation}) => {
        const taskName = navigation.state.params.tasks.task;

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
    TaskPage: {
      screen: TaskPage,
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
    screen: TeamNavigator,
  },
});

const RootNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  App: TabNavigator,
});

const Routes = createAppContainer(RootNavigator);

export default Routes;
