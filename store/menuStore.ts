import { defineStore } from "pinia";



// 过滤出有子菜单的菜单列表
const getParentMenu = function (menuList: MenuList) {
  menuList = useCloneDeep(menuList)
  return menuList.filter(v => {
    if (v.children) {
      v.children = getParentMenu(v.children)
      return true
    }
    return false
  })
}

// 通过文件路径查找菜单信息
const getMenuByFilePath = function (filePath: string, menuList: MenuList): Menu | null  {
  for (let menu of menuList) {
    if (menu.filePath === filePath) return menu
    if (menu.children) {
      const res = getMenuByFilePath(filePath, menu.children)
      if (res) return res
    }
  }
  return null
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuList: [] as MenuList,
    currentFilePath: '' as string
  }),
  getters: {
    parentMenuList (state) {
      const parentMenuList = getParentMenu(state.menuList)
      return parentMenuList
    },
    currentMenu (state) {
      return getMenuByFilePath(state.currentFilePath, state.menuList)
    }
  },
  actions: {
    async refreshMenu () {
      const { data } = await useFetch('/api/menu/getMenuList')
      this.menuList = data.value
    }
  }
})

