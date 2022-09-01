---
title: 最新echart使用代码，代码可直接复制使用
date: 2022-08-20
categories:
  - 前端开发

tags:
  - vue
  - ts
  - echart
---

:::tip 
vue3+ts使用echart最新可使用代码 
:::

<!-- more -->

### 直接代码为：
```js
  <template>
    <div class="piechart" ref="ChartContainer"></div>
  </template>
  <script lang="ts" setup>
  let chart: any = null
  const ChartContainer = ref<HTMLElement>()
  
  onMounted(() => {
    const options = getChartSetOption()
    chart = echarts.init(ChartContainer.value!)
    if (options) chart.setOption(options)
    window.addEventListener('resize', resizeHandler)
  })
  
  const resizeHandler = () => {
    if (chart) {
      chart.resize()
    }
  }
  
  const getChartSetOption = () => {
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return (
            '🎉 ' +
            params.seriesName +
            '<br/>' +
            '✨ ' +
            params.name +
            '：' +
            params.value +
            '篇'
          )
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '标签和文章数',
          type: 'pie',
          radius: '50%',
          data: props.pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    return option
  }
  </script>
  
  <style scoped>
  .piechart {
    width: 100%;
    height: 100%;
  }
  </style>
```
 其中的formatter是实现鼠标移入自定义显示的实现，可删除