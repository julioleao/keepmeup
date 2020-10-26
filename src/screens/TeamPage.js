import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/Styles';
import TeamListItem from '../components/TeamListItem';
import {connect} from 'react-redux';

import {teamList} from '../actions';

class TeamPage extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.props.teamList();
  }

  render() {
    if (this.props.team === null && this.state.loading) {
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              this.props.navigation.navigate('NewTeam', {teamToEdit: null})
            }>
            <Icon name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      );
    }

    if (this.props.team === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.error}>Nenhum registro encontrado</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              this.props.navigation.navigate('NewTeam', {
                teamToEdit: null,
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
            data={this.props.team}
            renderItem={({item}) => (
              <TeamListItem
                team={item}
                onPressEdit={(parameters) =>
                  this.props.navigation.navigate('NewTeam', parameters)
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
              this.props.navigation.navigate('NewTeam', {teamToEdit: null})
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
  const {teamList} = state;

  if (teamList === null) {
    return {team: teamList};
  }

  const keys = Object.keys(teamList);
  const teamListWithId = keys.map((key) => {
    return {...teamList[key], id: key};
  });
  return {team: teamListWithId};
};

export default connect(mapStateToProps, {teamList})(TeamPage);
