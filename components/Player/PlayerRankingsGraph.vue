<template>
	<line-chart :chart-data="graphData" :options="options" :height="250" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ChartData, ChartOptions } from 'chart.js'
import { format } from 'date-fns'
import { KingdomRanking, TourneyRanking } from '~/types/types'

export default Vue.extend({
	name: 'PlayerRankingsGraph',
	computed: {
		kingdom ():KingdomRanking[] { return this.$store.state.kingdom_rankings },
		tourney ():TourneyRanking[] { return this.$store.state.tourney_rankings },
		graphData (): ChartData {
			return {
				labels: this.kingdom.map((rank: KingdomRanking) => format(new Date(rank.date), 'dd-MM')),
				datasets: [
					{ data: this.kingdom.map((rank: KingdomRanking) => rank.rank), borderColor: '#00d1b2', label: 'Kingdom Power' },
					{ data: this.tourney.map((rank: TourneyRanking) => rank.rank), borderColor: '#ebfffc', label: 'Tourney Points' },
				],
			}
		},
		options (): ChartOptions {
			return {
				legend: { position: 'bottom' },
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
