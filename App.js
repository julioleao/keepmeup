import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProjectPage from './src/screens/ProjectPage';
import TaskDetail from './src/screens/TaskDetail';
import TaskPage from './src/screens/TaskPage';
import capitalizeFirstLetter from './src/util/CapitalizeFirstLetter';

const StackNavigator = createStackNavigator(
  {
    'Main': {
      screen: TaskPage,
    },
    'TaskDetail': {
      screen: TaskDetail,
      navigationOptions: ({navigation}) => {
        const taskName = navigation.state.params.task.name;

        return({
          title: capitalizeFirstLetter(taskName),
        })
      },
    },
    'ProjectPage': {
      screen: ProjectPage,
      navigationOptions: ({navigation}) => {
        const taskName = navigation.state.params.task.name;
  
        return({
          title: capitalizeFirstLetter(taskName),
        })
      },
    },
  },
  
  {
    defaultNavigationOptions: {
      title: 'Meus Projetos',
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

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
