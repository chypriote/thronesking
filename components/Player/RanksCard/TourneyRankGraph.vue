<template>
	<line-chart :chart-data="graphData" :options="options" :height="250" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ChartData } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { format } from 'date-fns'
import { TourneyRanking } from '~/types'
import { Colors, defaultDataLabel, defaultOptions } from '~/components/Global/Graph'

export default Vue.extend({
	name: 'TourneyRankGraph',
	data: () => ({ options: defaultOptions({ stepSize: 1, suggestedMin: 1, reverse: true }) }),
	computed: {
		data (): TourneyRanking[] { return this.$store.state.player.tourney_rankings },
		graphData (): ChartData & any {
			return {
				plugins: [ChartDataLabels],
				labels: this.data.map((rank: TourneyRanking) => format(new Date(rank.date), 'dd-MM')),
				datasets: [
					{
						data: this.data.map((rank: TourneyRanking) => ({ ...rank, toString: () => rank.rank })),
						borderColor: Colors.PRIMARY,
						label: 'Tourney Rank',
						datalabels: defaultDataLabel((e: TourneyRanking) => `${Number(e.points).toLocaleString()} TP`),
					},
				],
			}
		},
	},
})
</script>
