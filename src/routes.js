import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/main';
import Product from './pages/product';


const Routes = createStackNavigator({
    Main: {
      screen: Main
    },
    Product:{
      screen: Product,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.product.title
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
