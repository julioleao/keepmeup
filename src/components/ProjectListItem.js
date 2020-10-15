import React from 'react';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import firebase from 'firebase';
import LongText from './LongText';
import {connect} from 'react-redux';
import {deleteProject} from '../actions';
import {Component} from 'react';

class ProjectListItem extends Component {
  getRightContent = () => {
    return (
      <TouchableOpacity
        style={Styles.right}
        onPress={async () => {
          await this.props.deleteProject(this.props.task);
        }}>
        <Icon name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };

  render() {
    const {task, onPressItem, onPressEdit} = this.props;
    const {name, date, description} = task;
    return (
      <View>
        <Swipeable
          renderRightActions={this.getRightContent}
          renderLeftActions={() => {
            return (
              <TouchableOpacity
                style={Styles.left}
                onPress={() => {
                  onPressEdit({projectToEdit: task});
                }}>
                <Icon name="edit" size={30} color="#FFF" />
              </TouchableOpacity>
            );
          }}>
          <View>
            {/* <TouchableOpacity
              onPress={() => {
                onPressItem({task});
              }}> */}
            <View style={Styles.titleContainer}>
              <Text style={Styles.projectTitle}>
                {capitalizeFirstLetter(name)}
              </Text>
            </View>
            {/* </TouchableOpacity> */}
            <LongText label="Descrição" content={description} />
          </View>
        </Swipeable>
        <View style={Styles.descriptionContainer}>
          <Text style={Styles.projectDate}>Data limite: {date}</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, {deleteProject})(ProjectListItem);
