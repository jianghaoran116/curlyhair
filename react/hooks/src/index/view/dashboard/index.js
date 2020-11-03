/**
 * @file dashboard页面
 * @author haoran
 */
import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import DashboardContent from '@index/container/dashboard-content/index';
import PersonInfo from '@index/container/person-info/index';
import CourseInfo from '@index/container/course-info/index';
// import NoContentPage from '@index/container/no-content-page/index';

import './index.less';

const path = '/dashboard'; // 此页面的路由的根路径
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

@connect(
  state => state.get('user').toJS(),
  null
)
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    console.log('loaded');
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { token } = this.props;
    return (
      <Layout className="layout-wraper">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <SubMenu key="sub1" icon={<UserOutlined />} title="我的">
              <Menu.Item key="1">
                <Link to={`${path}/userinfo${token ? ('/' + token) : ''}`}>基本信息</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={`${path}/courseinfo${token ? ('/' + token) : ''}`}>我的课程</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<SettingOutlined />} title="设置">
              <Menu.Item key="3">
                <Link to={`${path}/updatepassword${token ? ('/' + token) : ''}`}>修改密码</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path={`${path}/userinfo/:token?`} component={PersonInfo}></Route>
              <Route path={`${path}/courseinfo/:token?`} component={CourseInfo}></Route>
              <Route path="*" component={DashboardContent}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
