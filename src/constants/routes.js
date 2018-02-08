import BlogList from '../components/list/list'
import Desc from '../components/desc/desc'
import Archive from '../components/archive/archive'
import About from '../components/about/about'
export const routes = [{
  key: '首页',
  path: '/app/index',
  component: BlogList
}, {
  key: '标签搜索',
  path: '/app/tags/:tags',
  component: BlogList
}, {
  key: '分类搜索',
  path: '/app/catalog/:catalog',
  component: BlogList
}, {
  key: '归档',
  path: '/app/archive',
  component: Archive
}, {
  key: '博客详情',
  path: '/app/blog/desc/:id',
  component: Desc
}, {
  key: '关于我',
  path: '/app/about',
  component: About
}]