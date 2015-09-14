
/**  디비 커넥션 설정 */
var mongoose = require('mongoose');                     // 몽고디비 모듈
mongoose.connect('mongodb://localhost:27017/todolist');     // 몽고디비연결
/** 설정 끝 */

module.exports = mongoose;