<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const dialogVisible = ref(false)

const openDialog = () => {
  dialogVisible.value = true
}

const formRef = ref<FormInstance>()
const formData = reactive({
  parentMenu: '',
  title: '',
  path: ''
})
const ruels = reactive<FormRules>({

})
const handleSubmit = () => {

}
defineExpose({
  openDialog
})
</script>

<template lang="pug">
el-dialog(title="新增菜单", v-model="dialogVisible")
  el-form(ref="formRef", :rules="ruels", :model="formData")
    el-form-item(label="父级菜单")
      el-select(v-model="formData.parentMenu")
        el-option(label="无", value="")
  template(#footer)
    .text-center
      el-button(type="primary", @click="handleSubmit") 确认
      el-button(@click="dialogVisible = false") 取消
</template>