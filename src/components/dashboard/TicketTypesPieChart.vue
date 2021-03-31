<template>
  <v-chart :options="chartOptions" />
</template>

<script>
export default {
  name: 'TicketTypesPieChart',
  data () {
    return {
      chartOptions: {
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 5,
          // right: 10,
          // top: 20,
          // bottom: 20,
          data: ['Total', 'Manutenção', 'Segurança', 'Sem Categoria']
          // selected: ''
        },
        series: [
          {
            name: 'Teste',
            type: 'pie',
            radius: '60%',
            label: {
              position: 'inner'
            },
            center: [120, 200],
            data: [{ name: 'Total', value: 50 }, { name: 'Manutenção', value: 30 }, { name: 'Segurança', value: 20 }, { name: 'Sem Categoria', value: 20 }],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
