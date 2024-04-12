<template>
  <div class="flex justify-between">
    <div v-for="i in boardData" class="bg-white w-1/4 min-h-[50] m-4 p-4 flex flex-col">
      <div class="text-slate-500 flex justify-between items-center border-b border-slate-100">
        <span>{{ i.title }}</span>
        <el-tooltip effect="light" :content="i.info || '暂无'" placement="bottom-start">
          <el-icon>
            <InfoFilled />
          </el-icon>
        </el-tooltip>
      </div>
      <div class="flex-1 border-b border-slate-100 px-1">
        <div class="font-bold text-2xl my-2">{{ i.total }}</div>
        <div class="my-2">
          昨日：{{ i.lastDay || 0 }}
          <el-icon color="red">
            <CaretTop />
          </el-icon>
        </div>
        <div class="my-2">
          今日：{{ i.today || 0 }}
          <el-icon :color="i.today ? 'red' : 'black'">
            <CaretBottom v-if="!i.today" />
            <CaretTop v-else />
          </el-icon>
        </div>
      </div>
      <div>
        相比上一周期：{{ i.lastTime || getRandom(10) + '%' }}
        <el-icon color="red">
          <CaretTop />
        </el-icon>
      </div>
    </div>
  </div>
  <div class="flex bg-white m-4 p-2 h-[60vh]">
    <div class="border-r-2 border-slate-200">
      <Echarts :chart-style="{ width: '60vw', height: '60vh' }" :chart-option="chartOption" />
    </div>
    <div class="p-2 flex-1">
      <Echarts :chart-style="{ width: '100%', height: '20vh' }" :chart-option="typeOption" />
      <div class="font-extrabold mt-4 pt-4 border-t border-slate-200">浏览量最高的文章</div>
      <div class="mt-4">
        <div v-for="(i, index) in blogs" class="my-2 flex hover:bg-slate-200 p-2 cursor-pointer" @click="router.push('/display?id='+i.id)">
          <span :class="`bg-${index <= 2 ? 'black' : 'slate-200'} text-${index <= 2 ? 'white' : 'black'}`"
            class="rounded-full block w-6 h-6 text-center leading-6">{{ index + 1 }}</span>
          <span class="ml-4 flex-1">{{ i.title }}</span>
          <span>{{ i.watch }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CaretBottom } from '@element-plus/icons-vue'
import Echarts from '../Echarts.vue'
import { getArticle, getAllFollowers } from '@/http/api'
import moment from 'moment';
const store = useStore()
const router = useRouter()
const boardData = ref([
  {
    title: '文章总数',
    info: '发表的文章总数',
    total: 100,
    lastDay: 0,
    today: 0,
  },
  {
    title: '点赞总数',
    info: '所有文章的点赞总数',
    total: 100
  },
  {
    title: '评论总数',
    info: '所有的文章的评论总数',
    total: 100
  },
  {
    title: '粉丝总数',
    info: '被多少用户关注了',
    total: 100
  }
])
const blogs = ref([])
const chartOption = ref({
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  title: {
    text: '一周内发表博客数',
  },
  grid: {
    left: '5%',
    right: '2%',
    bottom: '5%'
  },
  series: [
    {
      data: [0,0,0,0,0,0,0],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
})
const typeOption = ref({
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: '发表博客类型'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      // adjust the start and end angle
      top: "-30%",
      bottom: '-40%',
      startAngle: 180,
      endAngle: 360,
      data: []
    }
  ]
});
getArticle({ pageSize: 100 }).then(res => {
  boardData.value[0].total = res.data.rows.length
  let num = 0
  let today = 0
  let good = 0
  let comment = 0
  let type = new Map()
  for(let i=0;i<=6;i++){
    chartOption.value.xAxis.data.unshift(moment().subtract(i,'days').format('YYYY MM DD'))
  }
  res.data.rows.map(i => {
    let time = moment(moment(i.time).format('YYYY M DD').split(' ').map((i, index) => { return index != 1 ? i : i - 1 })).diff(moment(), 'days')
    if(time >= -6)
    chartOption.value.series[0].data[6+time]++
    if (time == 0)
      today++
    if (time == -1)
      num++
    if (i.good)
      good = good + JSON.parse(i.good).length
    comment += i.Comments.length
    if (type.has(i.type)) {
      type.set(i.type, [...type.get(i.type), i])
    }
    else
      type.set(i.type, [i])
  })
  let arr = []
  type.forEach((a, b) => {
    arr.push({ name: b, value: a.length })
  })
  typeOption.value.series[0].data = arr
  boardData.value[0].lastDay = num
  boardData.value[0].today = today
  boardData.value[1].total = good
  boardData.value[2].total = comment
  blogs.value = res.data.rows.sort((a, b) => b.watch - a.watch).filter((i, index) => index <= 4)
})
getAllFollowers(store.userId).then(res => {
  boardData.value[3].total = res.data.length
})
const getRandom = (max) => {
  return (Math.random() * max).toFixed(1)
}

</script>

<style lang="scss" scoped></style>