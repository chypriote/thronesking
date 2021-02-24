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
const ordinal = require('ordinal-numbers')

export default Vue.extend({
	name: 'KingdomRankGraph',
	data: () => ({ options: defaultOptions({ stepSize: 1, suggestedMin: 1, reverse: true }) }),
	computed: {
		data (): KingdomRanking[] { return this.$store.state.player.kingdom_rankings },
		graphData (): ChartData & any {
			return {
				plugins: [ChartDataLabels],
				labels: this.data.map((rank: KingdomRanking) => format(new Date(rank.date), 'dd-MM')),
				datasets: [
					{
						data: this.data.map((rank: KingdomRanking) => ({ ...rank, toString: () => rank.rank })),
						borderColor: Colors.PRIMARY,
						label: 'Kingdom Rank',
						datalabels: defaultDataLabel((e: KingdomRanking) => ordinal(e.rank)),
					},
				],
			}
		},
	},
})
</script>
