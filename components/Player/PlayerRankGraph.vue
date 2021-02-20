<template>
	<line-chart :chart-data="graphData" :options="options" :height="250" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ChartOptions } from 'chart.js'
import { format } from 'date-fns'
import { Ranking } from '~/types/types'

interface GraphData {
	labels: string[]
	datasets: any[]
}

export default Vue.extend({
	name: 'PlayerRankGraph',
	computed: {
		rankings ():Ranking[] { return this.$store.state.player_rankings },
		graphData (): GraphData {
			return {
				labels: this.rankings.map((rank: Ranking) => format(new Date(rank.date), 'MM-dd')),
				datasets: [
					{ data: this.rankings.map((rank: Ranking) => rank.rank), borderColor: '#00d1b2' },
				],
			}
		},
		options (): ChartOptions {
			return {
				legend: { display: false },
				elements: {
					line: { tension: 0, fill: false },
				},
				scales: {
					yAxes: [{
						ticks: { stepSize: 1, suggestedMin: 1, reverse: true },
					}],
				},
			}
		},
	},
})
</script>
