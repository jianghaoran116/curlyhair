/**
 * @file index页面的入口文件
 * @author haoran
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from '@index/store/index';
import RouterList from '@index/component/router-list/index'
import AuthRoute from '@index/component/author-router/index';
import './index.less';

ReactDom.render(
  (<Provider store={store}>
    <HashRouter>
      <React.Fragment>
        <AuthRoute></AuthRoute>
        <RouterList></RouterList>
      </React.Fragment>
    </HashRouter>
  </Provider>),
  document.getElementById('root'),
);

