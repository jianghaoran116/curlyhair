/**
 * @file 用户信息页面
 * @author haoran
 */
import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Typography,
  Row,
  Col,
  Button,
  Spin,
} from 'antd';
import { getPersonInfo, updatePersonInfo } from '@index/redux/person-info.redux';

const { Title } = Typography;
const layout = {
  labelCol: { span: 4 },
};

@connect(
  (state) => {
    return {
      ...state.get('user').toJS(),
      ...state.get('personInfo').toJS(),
    }
  },
  { getPersonInfo, updatePersonInfo }
)
class PersonInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: '',
      tel: '',
      email: '',
    };
  }

  handleChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    })
  }

  updatePersonInfo = () => {
    const { phone, tel, email } = this.state;
    this.props.updatePersonInfo({
      phone,
      tel,
      email,
      idCard: this.props.idCard,
    }).then(() => {
      this.props.getPersonInfo(this.props.user.user.idCard).then(() => {
        this.initInfo();
      });
    })
  }

  /**
   * 初始化 电话 邮件信息
   */
  initInfo = () => {
    if (this.props && this.props.personInfo) {
      const {
        phone,
        tel,
        email,
      } = this.props.personInfo;

      this.setState({
        phone,
        tel,
        email,
      })
    }
  }

  componentDidMount() {
    this.initInfo();
  }

  componentDidUpdate(preProps, preState, spanshot) {
    if (preProps.idCard !== this.props.idCard) {
      this.props.getPersonInfo(this.props.user.user.idCard).then(() => {
        this.initInfo();
      });
    }
  }

  render() {
    const {
      userNum,
      userName,
      gender,
      // phone,
      // tel,
      // email,
      birthDate,
      idCardType,
      idCard,
      courtName,
      admissionDate,
      professionalName,
      grade,
      address,
      endYear,
      endMonth,
      userType,
    } = this.props.personInfo;
    console.log('this.state:::', this.state);
    const {
      phone,
      tel,
      email,
    } = this.state;
    
    return (
      <Spin spinning={this.props.loading}>
        <div>
          <Form {...layout} name="nest-messages">
          <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="学号">
                  <span>{userNum}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="学生姓名">
                  <span>{userName}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="性别">
                  <span>{gender}</span>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="手机">
                  <Input value={phone} onChange={(e) => this.handleChange('phone', e)} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="电话">
                  <Input value={tel} onChange={(e) => this.handleChange('tel', e)} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="邮箱">
                  <Input value={email} onChange={(e) => this.handleChange('email', e)} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="出生日期">
                  <span>{birthDate}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="证件类型">
                  <span>{idCardType}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="证件号">
                  <span>{idCard}</span>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="注册日期">
                  <span>{admissionDate}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="院系名称">
                  <span>{courtName}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="专业名称">
                  <span>{professionalName}</span>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="所属班级">
                  <span>{grade}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="地址">
                  <span>{address}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="毕业年">
                  <span>{endYear}</span>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="毕业月">
                  <span>{endMonth}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                
                <Form.Item label="学生类型">
                  <span>{userType}</span>
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="primary"
                style={{ margin: '0 auto' }}
                onClick={this.updatePersonInfo}
              >
                修改
              </Button>
            </Row>
          </Form>
        </div>
      </Spin>
    );
  }
}

export default PersonInfo;
