import Vue from 'vue'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
// register component to use
Vue.component('v-chart', ECharts)
