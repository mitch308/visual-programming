import { createRouter, defineEventHandler, useBase } from 'h3'
import fs from 'fs'
import path from 'path'

const pageDataDir = './server/data'
const pagesDataFilePath = path.resolve(pageDataDir, 'pages.json')
const pagesFilesDir = path.resolve(pageDataDir, 'pages')

const router = createRouter()

// 根据path获取菜单信息
const getMenu = (paths: string[], menuList: Menu[]): Menu | null => {
  const root = {
    path: '',
    title: '根菜单',
    filePath: '',
    level: 0,
    children: menuList
  }
  if (paths[0] === '') return root
  let cur: Menu | undefined = root
  for (let i = 0; i < paths.length; i++) {
    cur = cur.children?.find(v => v.path === paths[i])
    if (!cur) return null
  }
  return cur
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
  // 获取父菜单信息
  const parentMenu = getMenu(data.paths, menuList)
  // 如果父菜单信息不存在，报错
  if (!parentMenu) {
    throw createError({
      statusCode: 400,
      statusMessage: '父菜单不存在',
    })
  }
  // 生成文件路径
  let filePath = path.resolve(pagesFilesDir, parentMenu.filePath, data.path)
  if (data.hasSubMenu === 'NO') filePath = filePath + '.json'
  // 判断同路径的菜单是否已存在，如果存在则报错
  if (parentMenu.children?.find(v => v.filePath === filePath)) {
    throw createError({
      statusCode: 400,
      statusMessage: '该父菜单下已存在同路径的菜单'
    })
  }
  // 创建菜单信息数据
  const menu: Menu = {
    title: data.title,
    path: data.path,
    filePath: filePath,
    level: parentMenu.level  + 1,
    children: data.hasSubMenu === 'YES' ? [] : undefined,
  }
  // 如果没有子菜单，表示该菜单有页面文件，生成页面文件信息
  if (data.hasSubMenu === 'NO') {
    // 如果文件目录不存在，先创建文件目录，否则会报错
    const parentDir = path.resolve(pagesFilesDir, parentMenu.filePath)
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true })
    fs.writeFileSync(path.resolve(pagesFilesDir, filePath), JSON.stringify({
      title: menu.title,
      path: menu.path,
      level: menu.level,
      pages: []
    }))
  }
  // 将菜单信息插入到父菜单的子菜单列表数据中
  parentMenu.children?.push(menu)
  // 写入菜单列表数据文件
  fs.writeFileSync(pagesDataFilePath, JSON.stringify(menuList))
  return menuList
}))

export default useBase('/api/menu', router.handler)
