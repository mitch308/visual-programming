<script setup lang="ts">
import type { FormInstance, FormRules, CascaderOption } from 'element-plus'
import { useMenuStore } from '../../store/menu';
const dictionary = inject<Dictionary>('dictionary') || {}

const menuStore = useMenuStore()

const options = [{title: '无', path: '/', level: 0}, ...menuStore.parentMenuList] as CascaderOption[]

const dialogVisible = ref(false)


const formRef = ref<FormInstance>()
const formData = reactive({
  parentMenu: '/',
  hasSubMenu: '',
  title: '',
  path: ''
})
const ruels = reactive<FormRules>({
  parentMenu: [{required: true, message: '请选择父级菜单'}],
  hasSubMenu: [{required: true, message: '请选择是否有子菜单'}],
  title: [{required: true, message: '请输入菜单路径'}],
  path: [{
    required: true,
    validator (rules, value, callback) {
      if (!value) return callback('请输入菜单路径')
      if (!/^[^\/]*$/.test(value)) return callback('菜单路径中不能有斜杠')
      callback()
    }
  }]
})
// 打开弹窗
const openDialog = () => {
  dialogVisible.value = true
  formRef.value?.resetFields()
}
// 提交表单
const handleSubmit = () => {
  formRef.value?.validate(valid => {
    if (!valid) return
    useFetch('/api/menu/addMenu', {
      method: 'post',
      body: formData
    }).then(({error}) => {
      if (error.value) {
        ElMessage.error(error.value.data.statusMessage)
      } else {
        dialogVisible.value = false
        ElMessage.success('新增菜单成功！')
        menuStore.refreshMenu()
      }
    })
  })
}
defineExpose({
  openDialog
})
</script>

<template lang="pug">
el-dialog(title="新增菜单", v-model="dialogVisible", width="400px")
  el-form(ref="formRef", :rules="ruels", :model="formData", label-width="130px")
    el-form-item(label="父级菜单", prop="parentMenu")
      el-cascader(:options="options", :props="{label: 'title', value: 'path', emitPath: false, checkStrictly: true}", v-model="formData.parentMenu")
    el-form-item(label="是否有子菜单", prop="hasSubMenu")
      el-select(v-model="formData.hasSubMenu")
        el-option(v-for="item in dictionary.yesOrNo", :label="item.label", :value="item.value")
    el-form-item(label="菜单名称", prop="title")
      el-input(v-model="formData.title")
    el-form-item(label="菜单路径", prop="path")
      el-input(v-model="formData.path", placeholder="只需要输入最后一个 / 符号后面的路径")
  template(#footer)
    .text-center
      el-button(type="primary", @click="handleSubmit") 确认
      el-button(@click="dialogVisible = false") 取消
</template>