import { createRouter, defineEventHandler, useBase } from 'h3'
import fs from 'fs'
import path from 'path'

const router = createRouter()

// 根据path获取菜单信息
const getMenu = (path: string, menuList: Menu[]): Menu | null => {
  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i]
    if (path === menu.path) return menu
    if (menu.children && menu.children.length) {
      let res = getMenu(path, menu.children)
      if (res) return res
    }
  }
  return null
}

// 获取菜单列表
router.get('/getMenuList', defineEventHandler((event) => {
  const menuListStr = fs.readFileSync('./server/data/pages.json', {encoding: 'utf-8'})
  const menuList = JSON.parse(menuListStr || '[]')
  return menuList
}))

// 添加菜单
router.post('/addMenu', defineEventHandler(async (event) => {
  const data: MenuForm = await readBody(event)
  const menuListStr = fs.readFileSync('./server/data/pages.json', {encoding: 'utf-8'})
  const menuList = JSON.parse(menuListStr || '[]')
  const parentMenu = getMenu(data.parentMenu, menuList)
  if (parentMenu) {
    let filePath = path.resolve('/', parentMenu.path, data.path)
    if (data.hasSubMenu === 'NO') filePath = filePath + '.json'
    const level = filePath.split('/').length - 1
    const menu = {
      title: data.title,
      path: filePath,
      level,
      children: data.hasSubMenu ? [] : null,
    }
    parentMenu.children?.push(menu)
  }
  return
}))

export default useBase('/api/menu', router.handler)
