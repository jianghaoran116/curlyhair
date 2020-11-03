/**
 * @file 个人信息
 * @author haoran
 */
import axios from '@index/helpers/axios';
import Immutable from 'immutable';
import { message } from 'antd';

import { personApi } from '@index/helpers/api-url';

const SET_PERSON_INFO = Symbol.for('SET_PERSON_INFO');
const UPDATE_PERSON_INFO = Symbol.for('UPDATE_PERSON_INFO');
const SET_LOADING = Symbol.for('SET_LOADING');

const {
  studentInfoUrl,
} = personApi;

const initState = Immutable.fromJS({
  personInfo: {},
  loading: true,
})

function getPersonInfoTask(id) {
  return axios.get(`${studentInfoUrl}/${id}`);
}

function updatePersonInfoTask(params) {
  return axios.patch(`${studentInfoUrl}`, params);
}

export function personInfo(state=initState, action){
  switch(action.type){
    case SET_PERSON_INFO:
      return state.set('personInfo', action.payload);
    case SET_LOADING:
      return state.set('loading', action.payload);
    default:
      return state
  }
}

export function setPersonInfo(data) {
  return {
    type: SET_PERSON_INFO,
    payload: data,
  }
}

export function setLoadingState(state) {
  return {
    type: SET_LOADING,
    payload: state,
  }
}

export function getPersonInfo(id) {
  return async (dispatch) => {
    const data = await getPersonInfoTask(id);
    if (data.status === 200 && data.data.code === '000000') {
      message.success(data.data.mesg);
      console.log(data.data.data);
      dispatch(setLoadingState(false));
      dispatch(setPersonInfo(data.data.data));
      return Promise.resolve(data.data.data);
    }
  }
}

export function updatePersonInfo(params) {
  return async (dispatch) => {
    const data = await updatePersonInfoTask(params)
    return Promise.resolve(data);
  }
}
