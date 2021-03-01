const request = require("@curlyhair-biz-cli-dev/request");

module.exports = function () {
  return request({
    url: "/project",
  });
};
