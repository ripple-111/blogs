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
import Echarts from '../Echarts.vue';
import { getArticle } from '@/http/api'
var data = {
  name: 'flare',
  children: [
    {
      name: 'flex',
      children: [{ name: 'FlareVis', value: 4116 }]
    },
    {
      name: 'scale',
      children: [
        { name: 'IScaleMap', value: 2105 },
        { name: 'LinearScale', value: 1316 },
        { name: 'LogScale', value: 3151 },
        { name: 'OrdinalScale', value: 3770 },
        { name: 'QuantileScale', value: 2435 },
        { name: 'QuantitativeScale', value: 4839 },
        { name: 'RootScale', value: 1756 },
        { name: 'Scale', value: 4268 },
        { name: 'ScaleType', value: 1821 },
        { name: 'TimeScale', value: 5833 }
      ]
    },
    {
      name: 'display',
      children: [{ name: 'DirtySprite', value: 8833 }]
    }
  ]
}
const option = {
  title: {
    text: 'IPFS树结构'
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  legend: {
    top: '2%',
    orient: 'vertical',
    data: [
      {
        name: 'tree1',
        icon: 'rectangle'
      }
    ],
    borderColor: '#c23531'
  },
  series: [
    {
      type: 'tree',
      name: 'tree1',
      left: '5%',
      right: '15%',
      bottom: '5%',
      data: [data],
      symbolSize: 7,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right'
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
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
const wordOption = ref({
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
const pieOption = {
  title: {
    text: '博客24小时发表时刻图'
  },
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }
  ]
};
getArticle().then(res => {
  let tags = new Map()
  res.data.rows.map(i => {
    i.tags.split(',').map(n => {
      if (tags.has(n)) {
        tags.set(n, tags.get(n)+1)
      }
      else
        tags.set(n,1)
    })
  })
  let arr = []
  tags.forEach((a,b)=>{
    arr.push({name:b,value:a})
  })
  wordOption.value.series[0].data=arr
})
</script>

<style lang="scss" scoped></style>