/**
 * @file 请求的地址
 * @author haoran
 */

export const api = {
  API_URL: 'http://124.17.100.183:30012/oaservice/',
  API_URL_EBS: 'http://ebstest.pumc.edu.cn:8010/webservices/',
  BASE_LOGIN_URL: 'http://124.17.100.183:30209/isump/',
  FILESERVICE_URL: 'http://124.17.100.183:30201/fileservice',
  BASE_URL: 'http://124.17.100.183:30080/hr/index.html#/',
  IP: 'http://124.17.100.183:30080',
  PERSON_CENTER_URL: 'http://124.17.100.183:30019/',
};

export const loginApi = {
  getSystimeUrl: `${api.BASE_LOGIN_URL}system/time`,
  loginUrl: `${api.BASE_LOGIN_URL}login`,
  loginUserUrl: `${api.API_URL}loginUser`,
};

export const personApi = {
  studentInfoUrl: `${api.PERSON_CENTER_URL}eas/student`,
}
