<template>
    <div :id="echartId" :style="chartStyle" />
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import * as lodash from 'lodash'
import { ref, onBeforeMount, onMounted, watch, nextTick, inject } from 'vue'
import resizeDetector from 'element-resize-detector'
const props = defineProps({
    chartStyle: {
        type: Object,
        default: () => ({
            width: '600px',
            height: '400px'
        })
    },
    chartOption: {
        type: Object,
        default: () => ({}),
        required: true
    }
})
const flag = inject('globalFlag')
watch(() => props.chartOption, () => {
    drawChart()
}, { deep: true })
let echart
const drawChart = () => {
    if (!echart) {
        echart = echarts.init(document.getElementById(echartId.value))
    }
    echart.setOption(props.chartOption, {
        notMerge: true // 不和之前的 option 合并
    })
    if (echart._$handlers?.click) {
        echart._$handlers.click.length = 0
    }
    echart.on('click', 'series', async (n) => {
        if (n.componentSubType == 'tree')
            alert(n.data.value,'cid已复制到剪切板')
        // 创建一个输入框元素
        const inputElement = document.createElement('input');
        // 更新input的value
        inputElement.value = n.data.value;
        // 随便找个父级容器 建议找一个层级较深的DOM元素，避免过多的重绘
        const dom = document.getElementById(echartId.value)
        // 将创建的input添加到容器中
        dom.appendChild(inputElement);
        // 使用select方法将值选中
        inputElement.select();
        // 调用copy方法复制内容
        const flag = document.execCommand('copy');
        // 将输入框的值隐藏
        inputElement.style.display = 'none';
        // 删除生成的input元素
        inputElement.remove();
    })
    let resize = lodash.throttle(() => {
        echart.resize({
            animation: { duration: 300 }
        });
    }, 1000, { trailing: true })

    const erd = resizeDetector()
    erd.listenTo(document.getElementById(echartId.value), () => {
        nextTick().then(res => {
            setTimeout(() => {
                resize()
            }, 100)

        })
    })
    window.addEventListener('resize', (e) => {
        resize()
    })
}
const echartId = ref(null)

onBeforeMount(() => {
    echartId.value = `echarts-id-${parseInt(Math.random() * 1000000)}`
})

onMounted(() => {
    drawChart()
})
</script>