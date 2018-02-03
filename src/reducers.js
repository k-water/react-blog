import { combineReducers } from 'redux'
import { blog } from './redux/blog.redux'
import { user } from './redux/user.redux'
export default combineReducers({
  blog,
  user
})
