import _Promise from 'bluebird';

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * @param {Function} fun 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
*/
function Promise(fun, options) {
  options = options || {};
  return new _Promise((resolve, reject) => {
    if (typeof fun !== 'function') {
      reject();
    }
    options.success = resolve;
    options.fail = reject;
    fun(options);
  });
}

module.exports = {
  Promise: Promise,
  formatTime: formatTime
}
