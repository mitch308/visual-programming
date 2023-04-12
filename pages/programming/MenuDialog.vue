<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const dictionary = inject<Dictionary>('dictionary') || {}

const props = defineProps<{
  menuList: []
}>()

const options = [{title: '无', path: 'NO', level: 0}, ...props.menuList]

const dialogVisible = ref(false)


const formRef = ref<FormInstance>()
const formData = reactive({
  parentMenu: 'NO',
  hasSubMenu: '',
  title: '',
  path: ''
})
const ruels = reactive<FormRules>({
  parentMenu: [{required: true, message: '请选择父级菜单'}],
  hasSubMenu: [{required: true, message: '请选择是否有子菜单'}],
  title: [{required: true, message: '请输入菜单名称'}],
  path: [{required: true, message: '请输入菜单路径'}]
})
const openDialog = () => {
  dialogVisible.value = true
  formRef.value?.clearValidate()
}
const handleSubmit = () => {
  console.log(formData)
  formRef.value?.validate(valid => {
    if (!valid) return
    useFetch('/api/menu/addMenu', {
      body: formData
    }).then(() => {
      ElMessage.success('新增菜单成功！')
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