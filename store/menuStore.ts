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

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuList: [] as MenuList,
    currentMenu: null as Menu | null
  }),
  getters: {
    parentMenuList (state) {
      const parentMenuList = getParentMenu(state.menuList)
      return parentMenuList
    }
  },
  actions: {
    async refreshMenu () {
      const { data } = await useFetch('/api/menu/getMenuList')
      this.menuList = data.value
    }
  }
})

