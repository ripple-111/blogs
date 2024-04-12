<template>
  <div class="flex">
    <div class="bg-white m-2">
      <Echarts :chart-style="{ width: '40vw', height: '300px' }" :chart-option="option" />
    </div>
    <div class="bg-white flex-1 m-2">
      <Echarts :chart-style="{ width: '100%', height: '300px' }" :chart-option="wordOption" />
    </div>
  </div>
  <div class="bg-white m-2 flex-1 relative h-[500px]">
    <Echarts :chart-style="{ width: '100%', height: '480px' }" :chart-option="pieOption" class="absolute" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import Echarts from '../Echarts.vue';
import moment  from 'moment';
import { getArticle } from '@/http/api'
import { time } from 'echarts';
const store = useStore()
var data = reactive({
  name: store.info.username,
  children: []
})
const option = {
  title: {
    text: 'IPFS树结构'
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter:(i)=>{
      if(i.data.children)
      return `<div>${i.name}</div>`
      return `<div>${i.value}</div>`
    }
  },
  legend: {
    top: '2%',
    orient: 'vertical',
    data: [
      {
        name: 'IPFS树结构',
        icon: 'rectangle'
      }
    ],
    borderColor: '#c23531'
  },
  series: [
    {
      type: 'tree',
      name: 'IPFS树结构',
      left: '10%',
      right: '20%',
      bottom: '5%',
      data: [data],
      symbolSize: 7,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
        }
      },
      expandAndCollapse: true,
      emphasis: {
        focus: 'descendant'
      },
      animationDuration: 550,
      animationDurationUpdate: 750
    }
  ]
}
const wordOption = reactive({
  title: {
    text: '博客标签词云'
  },
  series: [
    {
      type: 'wordCloud',
      gridSize: 14,
      sizeRange: [16, 50],
      rotationRange: [0, 0],
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        // Color can be a callback function or a color string
        color: function () {
          // Random color
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },

      width: '100%',
      height: '100%',
      //数据
      data: []
    }
  ]
})
const pieOption = reactive({
  title: {
    text: '博客24小时发表时刻图'
  },
  xAxis: {
    max:24
  },
  yAxis: {

  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter:(i)=>{
      return `<div>${i.value[0]}</div>`
    }
  },
  series: [
    {
      symbolSize: 20,
      data: [],
      type: 'scatter'
    }
  ]
})
getArticle({pageSize:10000}).then(res => {
  let tags = new Map()
  let times = new Map()
  res.data.rows.map(i => {
    let utcTime = moment.utc(i.time)
    let hour = utcTime.hours()
    let minute = (utcTime.minutes() / 60).toFixed(2) 
    let time = hour + Number(minute)
    if(times.has(time)){
      times.set(time,times.get(time)+1)
    }
    else
    times.set(time,1)
    i.tags.split(',').map(n => {
      if (tags.has(n)) {
        tags.set(n, tags.get(n)+1)
      }
      else
        tags.set(n,1)
    })
  })
  let arr = []
  pieOption.series[0].data = Array.from(times)
  tags.forEach((a,b)=>{
    arr.push({name:b,value:a})
  })
  wordOption.series[0].data=arr
})
getIpfsInfo().then(res=>{
  let map = new Map()
  res.data.map(i=>{
    let arr = i.name.split('--')
    if(map.get(arr[0])){
      map.set(arr[0],[...map.get(arr[0]),i])
    }
    else{
      map.set(arr[0],[i])
    }
  })
  map.forEach((value,key)=>{
    data.children.push({
      name:key,
      children:value.map(i=>{
        return {
          name:i.name.split('--')[1] || 1,
          value:i.cid
        }
      })
    })
  })
})
</script>

<style lang="scss" scoped></style>