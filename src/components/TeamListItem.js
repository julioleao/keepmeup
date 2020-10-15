import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Styles from '../styles/Styles';
import capitalizeFirstLetter from '../util/CapitalizeFirstLetter';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import {deleteTeam} from '../actions';

class TeamListItem extends Component {
  getRightContent = () => {
    return (
      <TouchableOpacity
        style={Styles.right}
        onPress={async () => {
          await this.props.deleteTeam(this.props.team);
        }}>
        <Icon name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };
  render() {
    const {team, onPressItem, onPressEdit} = this.props;
    const {name, email, pic, role} = team;
    return (
      <View>
        <Swipeable
          renderRightActions={this.getRightContent}
          renderLeftActions={() => {
            return (
              <TouchableOpacity
                style={Styles.left}
                onPress={() => {
                  onPressEdit({teamToEdit: team});
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
            <View style={[Styles.reqContainer, {flexDirection: 'row'}]}>
              <View style={{flexDirection: 'column', flex: 1, marginRight: 20}}>
                <Image
                  source={{uri: `data:image/jpeg;base64, ${pic}`}}
                  style={Styles.avatar}
                />
              </View>
              <View style={{flexDirection: 'column', flex: 4}}>
                <Text style={Styles.fontBold}>Nome</Text>
                <Text style={Styles.projectReq}>
                  {capitalizeFirstLetter(name)}
                </Text>
                <Text style={Styles.fontBold}>Email</Text>
                <Text style={Styles.projectReq}>{email}</Text>
              </View>
            </View>
          </View>
        </Swipeable>
        <View style={Styles.descriptionContainer}>
          <Text style={Styles.projectDate}>Função: {role}</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, {deleteTeam})(TeamListItem);
