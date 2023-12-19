<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { ipcRenderer } from 'electron';
const route = useRoute()
const router = useRouter()
// import { ipcRenderer } from 'electron';
// import print from './print.ts'
console.log(window)
const printList = ref([])
const printClick: () => void = async () => {
  console.log('打印', printList.value)
  const result = await window.electron.ipcRenderer.invoke('printHandlePrint', {
    silent: false, // 静默打印
    printBackground: true,
    deviceName: printList.value[2].deviceName,
    margins: { marginType: "none" }, // 网页的边距
    pageSize: "A4",
  })
  console.log(result)
}
const getPrintClick: () => void = async () => {
  console.log('获取打印机')
  const result = await window.electron.ipcRenderer.invoke('getPrints')
  printList.value = result
  // console.log(data)
}
const windowClick: () => void = () => {

  console.log(route, window.location.href)
  window.electron.ipcRenderer.invoke('newPrint')
}
const sanClick: () => void = async () => {
  await window.electron.ipcRenderer.invoke('toPrint')
}
onMounted(() => {
  console.log(window.location.href);

})
</script>

<template>
  <div class="card">
    <button type="button" @click="getPrintClick">获取打印机</button>
    <button type="button" @click="printClick">打印</button>
    <button type="button" @click="windowClick">第二窗口</button>
    <button type="button" @click="sanClick">第三窗口</button>
    <button type="button" @click="router.push('/print')">第四窗口</button>
    <div>测试测试测试</div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
