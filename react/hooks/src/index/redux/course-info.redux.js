/**
 * @file 课程信息
 * @author haoran
 */
// import axios from 'axios'
import Immutable from 'immutable';

// const USER_LIST = 'USER_LIST'

const initState = Immutable.fromJS({
  'records': [
    {
      'id': '404db13f912bddbb48d4606566448e5a',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2018-2019',
      'techPeriod': '2',
      'courseCode': '0234L31108',
      'courseName': '毕业考试',
      'totalScore': null,
      'courseDate': '2019-06-25',
      'examType': '正考',
      'examResult': '60.6',
      'resultType': '1',
      'techNum': 'J2014130002',
      'techName': '董燕',
      'clrq': '2020-08-13 22:50:15',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:02:41'
    },
    {
      'id': 'ce21238411bad1c545e9afcfc3e35646',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2018-2019',
      'techPeriod': '2',
      'courseCode': '0234S23108',
      'courseName': '科研训练',
      'totalScore': null,
      'courseDate': '2019-06-25',
      'examType': '正考',
      'examResult': '82.9',
      'resultType': '1',
      'techNum': 'J2009130039',
      'techName': '郭爱敏',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:52'
    },
    {
      'id': '3c94f4bfed2959178a6b8b4127ccb946',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '2',
      'courseCode': '0234L17106',
      'courseName': '护理研究',
      'totalScore': null,
      'courseDate': '2018-05-21',
      'examType': '正考',
      'examResult': '76.0',
      'resultType': '1',
      'techNum': 'J2009130039',
      'techName': '郭爱敏',
      'clrq': '2020-08-13 22:50:17',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:04:13'
    },
    {
      'id': 'e4e37ff7da792cc58e558663a68f7af5',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '2',
      'courseCode': '0234L40106',
      'courseName': '护理学Ⅴ 活动与休息（内科护理学、外科护理学）',
      'totalScore': null,
      'courseDate': '2018-05-21',
      'examType': '正考',
      'examResult': '82.9',
      'resultType': '1',
      'techNum': 'J2009130040',
      'techName': '李杨',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:58'
    },
    {
      'id': '025af9c101ff71a8ba2aab1ca544b24f',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '2',
      'courseCode': '0234L41106',
      'courseName': '护理学Ⅵ 认知与感觉(神经科护理学、精神科护理学)',
      'totalScore': null,
      'courseDate': '2018-05-21',
      'examType': '正考',
      'examResult': '81.0',
      'resultType': '1',
      'techNum': 'J2009130003',
      'techName': '李峥',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:02'
    },
    {
      'id': '1b4cf6d0ef808d41bfe1e16f34bc6e09',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '2',
      'courseCode': '0234L21208',
      'courseName': '专业发展',
      'totalScore': null,
      'courseDate': '2018-05-21',
      'examType': '正考',
      'examResult': '88.3',
      'resultType': '1',
      'techNum': 'J2009130003',
      'techName': '李峥',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:09'
    },
    {
      'id': '9a7840e3a92cb7b060329caaa092abe5',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '2',
      'courseCode': '0234L42106',
      'courseName': '社区护理学',
      'totalScore': null,
      'courseDate': '2018-05-21',
      'examType': '正考',
      'examResult': '86.4',
      'resultType': '1',
      'techNum': 'J2009130043',
      'techName': '邹海欧',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:40'
    },
    {
      'id': 'd7505f4fb3df71290c06494f5391beff',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '1',
      'courseCode': '0234L38105',
      'courseName': '护理学Ⅲ 氧合（内科护理学、外科护理学）',
      'totalScore': null,
      'courseDate': '2017-11-24',
      'examType': '正考',
      'examResult': '76.3',
      'resultType': '1',
      'techNum': 'J2009130036',
      'techName': '梁涛',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:54'
    },
    {
      'id': '4a33adc99e44f6601ab67143de2e22cd',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '1',
      'courseCode': '0234L22208',
      'courseName': '专题讲座',
      'totalScore': null,
      'courseDate': '2017-11-24',
      'examType': '正考',
      'examResult': '81.0',
      'resultType': '1',
      'techNum': 'J2009130012',
      'techName': '夏春红',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:20'
    },
    {
      'id': '4fec23ba14d45b7a237d9005ce261427',
      'userNum': '201502005',
      'userName': '苏莹',
      'techYear': '2017-2018',
      'techPeriod': '1',
      'courseCode': '0234L19107',
      'courseName': '护理管理学',
      'totalScore': null,
      'courseDate': '2017-11-24',
      'examType': '正考',
      'examResult': '84.4',
      'resultType': '1',
      'techNum': 'J2009130037',
      'techName': '赵红',
      'clrq': '2020-08-13 22:50:16',
      'czlx': 'I',
      'sjly': null,
      'createTime': '2020-09-03 15:03:21'
    }
  ],
  'total': 48,
  'size': 10,
  'current': 1,
  'searchCount': true,
  'pages': 5,
})

export function courseInfo(state = initState, action) {
  switch (action.type) {
    // case USER_LIST:
    //   return {...state, userlist:action.payload}
    default:
      return state
  }
}

// function userList(data){
//   return { type:USER_LIST, payload:data}
// }

// export function getUserList(type){
//   return dispatch=>{
//     axios.get('/user/list?type='+type)
//       .then(res=>{
//         if (res.data.code==0) {
//           dispatch(userList(res.data.data))
//         }
//       })

//   }
// }






