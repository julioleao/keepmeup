import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TaskList from '../components/TaskList';

import logo from '../assets/imgs/today.jpg';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import ProjectList from '../components/ProjectList';
import Firebase from '../../Firebase';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({loading: true});
    axios
      .get('https://api.jsonbin.io/b/5f4bab174d8ce4111383f5ea/1')
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

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={logo}
          style={styles.background}></ImageBackground>
        <View style={styles.buttonContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'center',
  },
  buttonContainer: {
    flex: 7,
  },
});
