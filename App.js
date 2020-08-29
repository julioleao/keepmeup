import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TaskDetail from './src/screens/TaskDetail';
import TaskPage from './src/screens/TaskPage';

const StackNavigator = createStackNavigator(
  {
    'Main': {
      screen: TaskPage,
    },
    'TaskDetail': {
      screen: TaskDetail,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.task.name,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      title: 'Minhas Tarefas',
      headerTitleStyle: {
        color: 'white',
        fontSize: 24,
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
