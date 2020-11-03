/**
 * @file 路由组件
 * @author haoran
 */
/**
 * @file index页面的入口文件
 * @author haoran
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '@index/view/login/index';
import Dashboard from '@index/view/dashboard/index';

class RouterList extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Route path='/' component={Login}></Route>
      </Switch>
    )
  }
};

export default RouterList;
