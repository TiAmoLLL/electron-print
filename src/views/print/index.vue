<template>
    <div class="print-container">
        <div>
            <button @click="router.back()">back</button>
        </div>
        <div class="box1">
            <div class="left">第一行靠左</div>
            <div class="right">第一行靠右</div>
        </div>
        <div class="box2">
            <div class="left">第2行靠左</div>
            <!-- <div class="right">第一行靠右</div> -->
        </div>
        <div class="box3">
            <!-- <div class="left">第一行靠左</div> -->
            <div class="right">第3行靠右</div>
        </div>
        <div class="box4">
            <span>第四行居中</span>
        </div>
        <div class="box5"> 绝对单位（Absolute Units）：绝对单位是与物理尺寸相关的单位，其值在不同设备和环境下保持固定。常见的绝对单位有：

            - 像素（Pixel，px）：像素是最常用的绝对单位，表示屏幕上的一个点。像素是固定的，不会根据屏幕大小而变化。在CSS中，像素通常用于指定元素的尺寸、间距、边框等属性。

        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const init = () => {
    // const result = await window.electron.ipcRenderer.invoke('printHandlePrint', {
    //     silent: true, // 静默打印
    //     // printBackground: true,
    //     // deviceName: printList.value[2].deviceName,
    //     margins: { marginType: "none" }, // 网页的边距
    // })
    console.log(route, window.location.href)
}
onMounted(() => {
    init()
})
</script>

<style lang='scss' scoped>
.print-container {
    width: 210mm;
    height: 297mm;
    // background-color: pink;

    .box1 {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .box2 {
        width: 100%;
    }

    .box3 {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .box4 {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}
</style>