export function timetrans(time) {
  var date = new Date(time)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  // var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  // var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D
}

export const color = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]

export function getDateDiff(dateTimeStamp) {
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return
  }
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  var result
  if (monthC >= 1) {
    result = "" + parseInt(monthC, 10) + "月前"
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC, 10) + "周前"
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC, 10) + "天前"
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC, 10) + "小时前"
  } else if (minC >= 1) {
    result = "" + parseInt(minC, 10) + "分钟前"
  } else
    result = "刚刚"
  return result
}