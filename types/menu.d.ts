declare module 'menu' {}
// 菜单接口
interface Menu {
  title: string;
  path: string;
  filePath: string;
  icon?: string;
  level: number;
  children: Menu[] | undefined;
}

interface MenuForm {
  paths: string[];
  hasSubMenu: 'YES' | 'NO' | '';
  title: string;
  path: string;
}

type MenuList = Menu[]
