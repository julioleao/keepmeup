import React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../styles/Styles';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default class LongText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  changeIsExpanded() {
    const {isExpanded} = this.state;

    this.setState({isExpanded: !isExpanded});
  }

  componentDidUpdate(prevProps, prevState) {
      LayoutAnimation.spring();
  }

  render() {
    const {label = '', content = ''} = this.props;
    const {isExpanded} = this.state;
    return (
      <View style={[Styles.descContainer]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={Styles.fontBold}>{label}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => this.changeIsExpanded()}>
            <Icon
              name={isExpanded ? 'eye' : 'eye-slash'}
              size={20}
              color="#5a5a5a"
            />
          </TouchableWithoutFeedback>
        </View>

        <View>
          <Text
            style={[
              Styles.projectReq,
              isExpanded ? styles.expanded : styles.collapsed,
            ]}>
            {content}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collapsed: {
    maxHeight: 0,
  },
  expanded: {
    flex: 1,
  },
});
