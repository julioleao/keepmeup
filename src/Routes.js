import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProjectPage from './screens/ProjectPage';
import TaskPage from './screens/TaskPage';
import capitalizeFirstLetter from './util/CapitalizeFirstLetter';
import LoginScreen from './screens/LoginScreen';
import TeamPage from './screens/TeamPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewTask from './screens/NewTask';
import NewProject from './screens/NewProject';
import NewTeam from './screens/NewTeam';

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
    NewTeam: {
      screen: NewTeam,
      navigationOptions: ({navigation}) => {
        if (navigation.state.params && navigation.state.params.teamToEdit) {
          const name = navigation.state.params.teamToEdit.name;
          return {
            title: capitalizeFirstLetter(name),
          };
        }
        return {
          title: 'NOVO INTEGRANTE',
        };
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

const TaskNavigator = createStackNavigator(
  {
    Task: {
      screen: TaskPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    NewTask: {
      screen: NewTask,
      navigationOptions: ({navigation}) => {
        if (navigation.state.params && navigation.state.params.taskToEdit) {
          const name = navigation.state.params.taskToEdit.name;
          return {
            title: capitalizeFirstLetter(name),
          };
        }
        return {
          title: 'NOVA TAREFA',
        };
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

const ProjectNavigator = createStackNavigator(
  {
    Project: {
      screen: ProjectPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    NewProject: {
      screen: NewProject,
      navigationOptions: ({navigation}) => {
        if (navigation.state.params && navigation.state.params.projectToEdit) {
          const name = navigation.state.params.projectToEdit.name;
          return {
            title: capitalizeFirstLetter(name),
          };
        }
        return {
          title: 'NOVO PROJETO',
        };
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

const TabNavigator = createBottomTabNavigator(
  {
    Projetos: {
      screen: ProjectNavigator,
      navigationOptions: {
        tabBarLabel: 'Projetos',
        tabBarIcon: ({tintColor}) => (
          <Icon name="folder" color={tintColor} size={24} />
        ),
      },
    },
    Tarefas: {
      screen: TaskNavigator,
      navigationOptions: {
        tabBarLabel: 'Tarefas',
        tabBarIcon: ({tintColor}) => (
          <Icon name="tasks" color={tintColor} size={24} />
        ),
      },
    },
    Time: {
      screen: TeamNavigator,
      navigationOptions: {
        tabBarLabel: 'Time',
        tabBarIcon: ({tintColor}) => (
          <Icon name="users" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      tabBarVisible: true,
    },
    tabBarOptions: {
      activeTintColor: '#6f00ff',
      inactiveTintColor: 'gray',
    },
  },
);

const RootNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  App: TabNavigator,
});

const Routes = createAppContainer(RootNavigator);

export default Routes;
