import React, { Component } from 'react';
import style from './index.scss';

class Home extends Component {
  componentDidMount() {
    import('lodash').then(({ default: _ }) => {
      const element = document.createElement('div');
      element.innerHTML = _.join(['Dell', 'Lee'], '-');
      return element;
    });
  }

  render() {
    return <div className={style.root}>HomePage</div>;
  }
}

export default Home;
