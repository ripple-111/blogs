<template>
    <div :id="echartId" :style="chartStyle" />
</template>

<script setup>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import * as lodash from 'lodash'
import { ref, onBeforeMount, onMounted, watch, nextTick } from 'vue'
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
    if(echart._$handlers?.click){
        echart._$handlers.click.length = 0
    }
    echart.on('click','series',(n)=>{
        if(n.componentSubType == 'tree')
        alert(n.data.value)
    })
    let resize = lodash.throttle(() => {
        echart.resize({
            animation: { duration: 300 }
        });
    }, 1000, { trailing: true })
    
    const erd = resizeDetector()
    erd.listenTo(document.getElementById(echartId.value), () => {
        nextTick().then(res => {
            setTimeout(()=>{
                resize()
            },100)
            
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