import axios from 'axios';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Styles from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProjectListItem from '../components/ProjectListItem';
import {connect} from 'react-redux';

import {projectList} from '../actions';

class ProjectPage extends Component {
  componentDidMount() {
    this.props.projectList();
  }

  render() {
    if (this.props.project === null) {
      return (
        <View style={Styles.container}>
          <ActivityIndicator
            size="large"
            color="#6f00ff"
            style={styles.container}
          />
          <TouchableOpacity
            style={Styles.addButton}
            onPress={() =>
              this.props.navigation.navigate('NewProject', {
                projectToEdit: null,
              })
            }>
            <Icon name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{height: '85%'}}>
          <FlatList
            contentContainerStyle={styles.list}
            data={[...this.props.project]}
            renderItem={({item}) => (
              <ProjectListItem
                task={item}
                /* onPressItem={(parameters) =>
                  this.props.navigation.navigate('TaskPage', parameters)
                } */
                onPressEdit={(parameters) =>
                  this.props.navigation.navigate('NewProject', parameters)
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>

        <TouchableOpacity
          style={Styles.addButton}
          onPress={() =>
            this.props.navigation.navigate('NewProject', {projectToEdit: null})
          }>
          <Icon name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },

  list: {
    padding: 20,
  },
  error: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red',
  },
});

const mapStateToProps = (state) => {
  const {projectList} = state;

  if (projectList === null) {
    return {project: projectList};
  }

  const keys = Object.keys(projectList);
  const projectListWithId = keys.map((key) => {
    return {...projectList[key], id: key};
  });
  return {project: projectListWithId};
};

export default connect(mapStateToProps, {projectList})(ProjectPage);
