import { combineReducers } from 'redux'
import { blog } from './redux/blog.redux'
import { comment } from './redux/comment.redux'
export default combineReducers({
  blog,
  comment
})
