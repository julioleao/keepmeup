import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import {deleteTask} from '../actions';
import LongText from './LongText';

class TaskListItem extends Component {
  getRightContent = () => {
    return (
      <TouchableOpacity
        style={Styles.right}
        onPress={async () => {
          await this.props.deleteTask(this.props.task);
        }}>
        <Icon name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };
  render() {
    const {task, onPressItem, onPressEdit} = this.props;
    const {name, date, req} = task;
    return (
      <View>
        <Swipeable
          renderRightActions={this.getRightContent}
          renderLeftActions={() => {
            return (
              <TouchableOpacity
                style={Styles.left}
                onPress={() => {
                  onPressEdit({taskToEdit: task});
                }}>
                <Icon name="edit" size={30} color="#FFF" />
              </TouchableOpacity>
            );
          }}>
          <View>
            <View style={Styles.titleContainer}>
              <Text style={Styles.projectTitle}>
                {capitalizeFirstLetter(name)}
              </Text>
            </View>
            <LongText label="Requisitos" content={req} />
          </View>
        </Swipeable>
        <View style={Styles.descriptionContainer}>
          <Text style={Styles.projectDate}>Data limite: {date}</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, {deleteTask})(TaskListItem);
