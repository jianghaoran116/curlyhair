/**
 * @file 判断用户是否登录
 * @author haoran
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToken, getUserInfo } from '@index/redux/user.redux';
import { getUrlToken } from '@index/helpers/util';

@withRouter
@connect(
  state => state.get('user').toJS(),
  { setToken, getUserInfo }
)
class AuthRoute extends React.Component{

  componentDidMount() {
    // 如果query里面没有token那么上pathname里取一次
    let token = getUrlToken(this.props.location.search, 'token');
    if (!token) {
      const tempArr = this.props.location.pathname.split('/');
      token = tempArr[tempArr.length - 1]
    }
    this.props.setToken(token);
    this.props.getUserInfo(token);
  }

  render() {
    return null;
  }
};

export default AuthRoute;
