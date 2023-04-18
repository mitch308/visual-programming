<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { cloneDeep } from 'lodash';
import { useMenuStore } from '../../store/menuStore';
const menuStore = useMenuStore()

const formRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  title: [{required: true, message: '菜单标题不能为空'}],
  path: [{
    required: true,
    validator (rules, value, callback) {
      if (!value) return callback('菜单路径不能为空')
      if (!/^[^\/]*$/.test(value)) return callback('菜单路径中不能有斜杠')
      callback()
    }
  }]
})
let oldFormData: Record<string, any> = cloneDeep(menuStore.currentMenu || {})
const formData = reactive(useCloneDeep(cloneDeep(oldFormData)))
const handleFieldChange = (val: string, field: string) => {
  formRef.value?.validateField(field, async (isValid, err) => {
    if (!isValid && err) {
      ElMessage.error(err[field][0].message)
      formData[field] = oldFormData[field]
    } else {
      handleUpdate()
    }
  })
}
const handleUpdate = useDebounce(async () => {
  useFetch('/api/menu/updateMenu', {
    method: 'post',
    body: JSON.stringify(formData)
  }).then(({error}) => {
    if (error.value) {
      ElMessage.error(error.value.data.message)
      return
    }
    oldFormData = useCloneDeep(formData)
  })
}, 300)
</script>

<template lang="pug">
el-form.page-info.px-2(:model="formData", :rules="rules", ref="formRef")
  el-form-item(label="页面名称", prop="title")
    el-input(v-model="formData.title", @change="handleFieldChange($event, 'title')")
  el-form-item(label="页面路径", prop="path")
    el-input(v-model="formData.path", @change="handleFieldChange($event, 'path')")
</template>

<style lang="scss" scoped>
</style>
