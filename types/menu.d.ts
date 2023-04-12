declare module 'menu' {}
// 菜单接口
interface Menu {
  title: string;
  path: string;
  icon?: string;
  level: number;
  children: Menu[] | null;
}

interface MenuForm {
  parentMenu: string;
  hasSubMenu: 'YES' | 'NO' | '';
  title: string;
  path: string;
}
