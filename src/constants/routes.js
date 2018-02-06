import BlogList from '../components/list/list'
import Desc from '../components/desc/desc'
import Archive from '../components/archive/archive'
export const routes = [{
  key: '首页',
  path: '/app/index',
  component: BlogList
}, {
  key: '标签搜索页',
  path: '/app/index/:tags',
  component: BlogList
}, {
  key: '归档',
  path: '/app/archive',
  component: Archive
}, {
  key: '博客详情',
  path: '/app/blog/desc/:id',
  component: Desc
}]