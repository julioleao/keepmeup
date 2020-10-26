import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles';
import TaskListItem from '../components/TaskListItem';
import {connect} from 'react-redux';

import {taskList} from '../actions';

class TaskPage extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.props.taskList();
  }

  render() {
    if (this.props.task === null && this.state.loading) {
      setTimeout(() => {
        this.setState({loading: false});
      }, 4000);
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color="#6f00ff"
            style={styles.container}
          />
        </View>
      );
    }
    if (this.props.task === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.error}>Nenhum registro encontrado</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              this.props.navigation.navigate('NewTask', {
                taskToEdit: null,
              })
            }>
            <Icon name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={[Styles.container, {paddingHorizontal: 0}]}>
        <View style={[Styles.container, {paddingHorizontal: 0}]}>
          <FlatList
            contentContainerStyle={Styles.list}
            data={this.props.task}
            renderItem={({item}) => (
              <TaskListItem
                task={item}
                onPressEdit={(parameters) =>
                  this.props.navigation.navigate('NewTask', parameters)
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={{height: '10%'}}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              this.props.navigation.navigate('NewTask', {taskToEdit: null})
            }>
            <Icon name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  list: {
    padding: 20,
  },
});

const mapStateToProps = (state) => {
  const {taskList} = state;

  if (taskList === null) {
    return {task: taskList};
  }

  const keys = Object.keys(taskList);
  const taskListWithId = keys.map((key) => {
    return {...taskList[key], id: key};
  });
  return {task: taskListWithId};
};

export default connect(mapStateToProps, {taskList})(TaskPage);
