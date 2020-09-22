import axios from 'axios';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Styles from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import PeopleList from '../components/PeopleList';

export default class TeamPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({loading: true});
    axios
      .get('https://api.jsonbin.io/b/5f4a9722993a2e110d3919e4/1')
      .then((response) => {
        const {team} = response.data;

        this.setState({
          team: team,
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
          <Text style={styles.error}>Erro ao carregar lista!</Text>
        ) : (
          <PeopleList
            team={this.state.team}
            onPressItem={(parameters) =>
              this.props.navigation.navigate('ProjectPage', parameters)
            }
          />
        )}
        <TouchableOpacity
          style={Styles.addButton}
          onPress={() => this.props.navigation.navigate('NewProject')}>
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
