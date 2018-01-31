export function timetrans(time){
  var date = new Date(time)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y+M+D+h+m+s
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