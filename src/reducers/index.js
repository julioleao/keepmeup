import {combineReducers} from 'redux';
import newProjectForm from './newProjectForm';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import taskReducer from './taskReducer';
import newTaskForm from './newTaskForm';
import teamReducer from './teamReducer';
import newTeamForm from './newTeamForm';

export default combineReducers({
  user: userReducer,
  projectForm: newProjectForm,
  projectList: projectReducer,
  taskForm: newTaskForm,
  taskList: taskReducer,
  teamForm: newTeamForm,
  teamList: teamReducer,
});
