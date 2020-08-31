import React, { Component } from 'react';
import ProjectList from '../components/ProjectList';

export default class ProjectPage extends Component {
  render() {    
    const {task} = this.props.navigation.state.params;
    const textElements = task.tasks.map(projeto => {
      return projeto
    });
    console.log(textElements);


    return(
      <ProjectList
      task={textElements}
      onPressItem={(parameters) =>
        this.props.navigation.navigate('TaskDetail', parameters)
      }
    />
    );   
  }
}