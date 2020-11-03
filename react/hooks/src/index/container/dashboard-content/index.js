/**
 * @file 管理页面首页
 * @author haoran
 */

import React from 'react';

class DashboardContent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'dashboard',
    };
  }

  render() {
    return (
      <div>
        {this.state.title}
      </div>
    );
  }
}

export default DashboardContent;
