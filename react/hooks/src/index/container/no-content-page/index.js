/**
 * @file 暂无内容页面
 * @author haoran
 */

import React from 'react';

class NoContentPage extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'no content',
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

export default NoContentPage;
