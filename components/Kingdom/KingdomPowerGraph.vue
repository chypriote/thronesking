<template>
	<line-chart :chart-data="graphData" :options="options" :height="250" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ChartData } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { format } from 'date-fns'
import { KingdomRanking } from '~/types'
import { Colors, defaultDataLabel, defaultOptions } from '~/components/Global/Graph'
const numeral = require('numeral')

export default Vue.extend({
	name: 'KingdomPowerGraph',
	data: () => ({ options: defaultOptions({ stepSize: 1, callback: value => numeral(value).format('0.0a').toUpperCase() }) }),
	computed: {
		data (): KingdomRanking[] { return this.$store.state.ladder.kingdom.current },
		graphData (): ChartData & any {
			return {
				plugins: [ChartDataLabels],
				labels: this.data.map((rank: KingdomRanking) => format(new Date(rank.date), 'dd-MM')),
				datasets: [
					{
						data: this.data.map((rank: KingdomRanking) => ({ ...rank, toString: () => rank.power })),
						borderColor: Colors.LIGHT,
						label: 'Kingdom Power',
						datalabels: defaultDataLabel((e: KingdomRanking) => `${numeral(e.power).format('0.0a').toUpperCase()} KP`),
					},
				],
			}
		},
	},
})
</script>
