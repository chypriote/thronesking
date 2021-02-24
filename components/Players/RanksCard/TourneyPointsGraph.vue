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
	name: 'TourneyPowerGraph',
	data: () => ({ options: defaultOptions() }),
	computed: {
		data (): TourneyRanking[] { return this.$store.state.player.tourney_rankings },
		graphData (): ChartData & any {
			return {
				plugins: [ChartDataLabels],
				labels: this.data.map((rank: TourneyRanking) => format(new Date(rank.date), 'dd-MM')),
				datasets: [
					{
						data: this.data.map((rank: TourneyRanking) => ({ ...rank, toString: () => rank.points })),
						borderColor: Colors.LIGHT,
						label: 'Tourney Points',
						datalabels: defaultDataLabel((e: TourneyRanking) => `${Number(e.points).toLocaleString()} TP`),
					},
				],
			}
		},
	},
})
</script>
