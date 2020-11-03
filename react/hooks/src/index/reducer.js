/**
 * @file 合并所有reducer 并且返回
 * @author haoran
 */
import { combineReducers } from 'redux-immutable';
import { user } from '@index/redux/user.redux';
import { personInfo } from '@index/redux/person-info.redux';
import { courseInfo } from '@index/redux/course-info.redux';

export default combineReducers({ 
  user,
  personInfo,
  courseInfo,
});
