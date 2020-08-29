import axios from 'axios';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import TaskList from '../components/TaskList';


type Props = {};
export default class TaskPage extends Component<Props> {
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
      .get('https://api.jsonbin.io/b/5f4a9783993a2e110d391a14')
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
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#CBCBCB" />
        ) : this.state.error ? (
          <Text style={styles.error}>
            Erro ao carregar lista de contatos...
          </Text>
        ) : (
          <TaskList
            task={this.state.task}
            onPressItem={(parameters) =>
              this.props.navigation.navigate('TaskDetail', parameters)
            }
          />
        )}
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
