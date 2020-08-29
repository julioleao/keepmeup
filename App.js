import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './src/pages';
import Project from './src/pages/project';


const Routes = createStackNavigator({
    Main: {
      screen: Main
    },
    Project:{
      screen: Project,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.project.name
      }),        
    },
  }, {
    defaultNavigationOptions: {
      title: 'Meus Projetos',
      headerTitleStyle: {
        color: 'white',
        fontSize: 30,
        flexGrow: 1,
        textAlign: 'center'
      },
      headerStyle: {
        backgroundColor: '#6f00ff',
        borderBottomWidth: 1,
        borderBottomColor: '#C5C5C5'
      }
    }
  });

  export default createAppContainer(Routes);
