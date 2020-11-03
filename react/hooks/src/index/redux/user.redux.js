import Immutable from 'immutable';
import { loginApi } from '@index/helpers/api-url';

import axios from '@index/helpers/axios';
import aes from '@index/helpers/crud-file';

const SET_TOKEN = Symbol.for('SET_TOKEN');
const SET_USERINFO = Symbol.for('SET_USERINFO');
const SET_REDIRECTTO = Symbol.for('SET_REDIRECTTO');
const SET_ISAUTH = Symbol.for('SET_ISAUTH');

const {
  loginUrl,
  getSystimeUrl,
  loginUserUrl,
} = loginApi;

const initState = Immutable.fromJS({
  token: '',
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: {},
  type: '',
  idCard: '',
});

// reducer
export function user(state = initState, action){
  switch(action.type){
    case SET_TOKEN:
      return state.set('token', action.payload);
    case SET_USERINFO:
      return state.merge({
        'user': action.payload,
        'idCard': action.payload.user.idCard,
      });
    case SET_REDIRECTTO:
      return state.set('redirectTo', action.payload);
    case SET_ISAUTH:
      return state.set('isAuth', action.payload);
    default:
      return state;
  }
}

// action
function getSystemTime() {
  return axios.get(getSystimeUrl);
}

function postUserInfo(keyStore, dateShow, data1) {
  return axios({
    method: 'post',
    url: `${loginUrl}?keyStore=${keyStore}&dateShow=${dateShow}`,
    data: data1,
  });
}

function getUserData() {
  return axios({
    method: 'get',
    url: `${loginUserUrl}?randomTime=${new Date().getTime() / 1000}`,
    data: {},
  });
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    payload: token,
  }
}

export function setUserInfo(obj) {
  return {
    type: SET_USERINFO,
    payload: obj,
  }
}

export function setRedirectTo(url) {
  return {
    type: SET_REDIRECTTO,
    payload: url,
  }
}

export function setIsAuth(state) {
  return {
    type: SET_ISAUTH,
    payload: state,
  }
}

export function getUserInfo(token) {
  return async (dispatch) => {
    const { data: userData } = await getUserData();
    if (userData.code === '000000') { // 登录成功
      dispatch(setRedirectTo('/dashboard'));
      dispatch(setIsAuth(true));
      dispatch(setUserInfo(userData.data));
    } else {
      dispatch(setRedirectTo('/login'));
      dispatch(setIsAuth(true));
      dispatch(setUserInfo({}));
    }
  }
}

export function login(state) {
  let keyStore = '';
  const key = 'JQY-jqy';
  let dateShow = '';
  console.log(state);
  return async (dispatch) => {
    try {
      const { data: sysTimeRes } = await getSystemTime();
      const data1 = { ...state, code: '', tel: '' };
      dateShow = sysTimeRes.data.substring(sysTimeRes.data.length - 6);
      // 加密用户名
      data1.username = aes.encryptByAES(data1.username, dateShow);
      // 加密请求密码
      data1.password = aes.encryptByAES(data1.password, dateShow);
      // 加密验证码，防止重放攻击
      keyStore = aes.md5(sysTimeRes.data + key);
      const { data: userInfo } = await postUserInfo(keyStore, sysTimeRes.data, data1);
      dispatch(setToken(userInfo.data.token));
      // axios.defaults.headers.common['token'] = userInfo.data.token;
      // window.localStorage.setItem("userToken", userInfo.data.token);
      const { data: userData } = await getUserData();
      if (userData.code === '000000') { // 登录成功
        dispatch(setRedirectTo('/dashboard'));
        dispatch(setIsAuth(true));
        dispatch(setUserInfo(userData.data));
      } else {
        dispatch(setRedirectTo('/login'));
        dispatch(setIsAuth(true));
        dispatch(setUserInfo({}));
      }
    } catch(err) {
      console.log('login err:::', err);
      return Promise.reject(err);
    }
  };
}
