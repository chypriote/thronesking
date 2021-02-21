<template>
	<line-chart :chart-data="graphData" :options="options" :height="250" />
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'date-fns'
import { ChartData, ChartOptions } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Color } from 'chartjs-plugin-datalabels/types/options'
import { Ranking, RankingTypes } from '~/types'

const formatDataLabel = (item: any) => {
	return item?.power ? `${Number(item.power).toLocaleString()} KP` : `${Number(item.points).toLocaleString()} TP`
}

export default Vue.extend({
	name: 'PlayerRankingsGraph',
	props: {
		type: {
			type: String,
			required: true,
		},
	},
	computed: {
		data (): Ranking[] {
			switch (this.type) {
			case RankingTypes.KINGDOM:
				return this.$store.state.kingdom_rankings
			case RankingTypes.TOURNEY:
				return this.$store.state.tourney_rankings
			default:
				return this.$store.state.kingdom_rankings
			}
		},
		getLabel (): string {
			return this.type === RankingTypes.KINGDOM ? 'Kingdom Power' : 'Tourney Points'
		},
		getBorderColor (): Color {
			return this.type === RankingTypes.KINGDOM ? '#00d1b2' : '#ebfffc'
		},
		graphData (): ChartData & any {
			return {
				plugins: [ChartDataLabels],
				labels: this.data.map((rank: Ranking) => format(new Date(rank.date), 'dd-MM')),
				datasets: [
					{
						data: this.data.map((rank: Ranking) => ({ ...rank, toString: () => rank.rank })),
						borderColor: this.getBorderColor,
						label: this.getLabel,
						datalabels: {
							clip: false,
							backgroundColor: '#22262b',
							borderWidth: 1,
							align: 'top',
							color: '#fff',
							display: (e: any) => e.active,
							formatter: formatDataLabel,
						},
					},
				],
			}
		},
		options (): ChartOptions {
			return {
				legend: { display: false },
				tooltips: { enabled: false },
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
