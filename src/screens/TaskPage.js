import axios from 'axios';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import TaskList from '../components/TaskList';
import Styles from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TaskPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      task: [],
      loading: false,
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.setState({loading: true});
    axios
      .get('https://api.jsonbin.io/b/5f4bab174d8ce4111383f5ea/2')
      .then((response) => {
        const {project} = response.data;

        this.setState({
          task: project,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#CBCBCB" />
        ) : this.state.error ? (
          <Text style={styles.error}>Erro ao carregar lista!</Text>
        ) : (
          <TaskList
            task={this.state.task}
            onPressItem={(parameters) =>
              this.props.navigation.navigate('ProjectPage', parameters)
            }
            onPressEdit={(parameters) =>
              this.props.navigation.navigate('ProjectDetail', parameters)
            }
          />
        )}
        <TouchableOpacity style={Styles.addButton} onPress={() => this.props.navigation.navigate('NewProject')}>
          <Icon name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red',
  },
});
