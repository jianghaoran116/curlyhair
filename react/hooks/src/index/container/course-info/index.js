/**
 * @file 课程信息页面
 * @author haoran
 */

import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

@connect(
  state => state.get('courseInfo').toJS(),
)
class CourseInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          title: '学年',
          dataIndex: 'techYear',
          key: 'techYear'
        },
        {
          title: '学期',
          dataIndex: 'techPeriod',
          key: 'techPeriod'
        },
        {
          title: '课程名',
          dataIndex: 'courseName',
          key: 'courseName'
        },
        {
          title: '成绩',
          dataIndex: 'examResult',
          key: 'examResult',
        },
      ],
    };
  }

  render() {
    const {
      columns
    } = this.state;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.records}
        />
      </div>
    );
  }
}

export default CourseInfo;
