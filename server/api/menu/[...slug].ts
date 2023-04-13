import { createRouter, defineEventHandler, useBase } from 'h3'
import fs from 'fs'
import path from 'path'

const pageDataDir = './server/data'
const pagesDataFilePath = path.resolve(pageDataDir, 'pages.json')
const pagesFilesDir = path.resolve(pageDataDir, 'pages')

const router = createRouter()

// 根据path获取菜单信息
const getMenu = (path: string, menuList: Menu[]): Menu | null => {
  if (path === '/') {
    return {
      path: '/',
      title: '根菜单',
      level: 0,
      children: menuList
    }
  }
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
  const menuListStr = fs.readFileSync(pagesDataFilePath, {encoding: 'utf-8'})
  const menuList = JSON.parse(menuListStr || '[]')
  return menuList
}))

// 添加菜单
router.post('/addMenu', defineEventHandler(async (event) => {
  const data: MenuForm = await readBody(event)
  const menuListStr = fs.readFileSync(pagesDataFilePath, {encoding: 'utf-8'})
  const menuList = JSON.parse(menuListStr || '[]')
  const parentMenu = getMenu(data.parentMenu, menuList)
  if (!parentMenu) {
    throw createError({
      statusCode: 400,
      statusMessage: '父菜单不存在',
    })
  }
  let filePath = path.resolve('/', parentMenu.path, data.path)
  if (data.hasSubMenu === 'NO') filePath = filePath + '.json'
  if (parentMenu.children?.find(v => v.path === filePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: '该父菜单下已存在同路径的菜单'
    })
  }
  const level = filePath.split('/').length - 1
  const menu = {
    title: data.title,
    path: filePath,
    level,
    children: data.hasSubMenu ? [] : undefined,
  }
  parentMenu.children?.push(menu)
  fs.writeFileSync(pagesDataFilePath, JSON.stringify(menuList))
  if (data.hasSubMenu === 'NO') {
    fs.writeFileSync(path.resolve(pagesFilesDir, filePath.substring(1)), JSON.stringify({
      title: menu.title,
      path: menu.path,
      level: menu.level
    }))
  }
  return menuList
}))

export default useBase('/api/menu', router.handler)
