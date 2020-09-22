import {combineReducers} from 'redux';
import newProjectForm from './newProjectForm';
import userReducer from './userReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  user: userReducer,
  projectForm: newProjectForm,
  projectList: projectReducer,
});
