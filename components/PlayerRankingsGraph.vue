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

interface Config {
	property: string
	color: Color
	label: string
}

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
			case RankingTypes.KINGDOM_RANK:
			case RankingTypes.KINGDOM_POWER:
				return this.$store.state.ladder.kingdom.current
			case RankingTypes.TOURNEY_RANK:
			case RankingTypes.TOURNEY_POINTS:
				return this.$store.state.ladder.tourney.current
			default:
				return []
			}
		},
		config (): Config {
			switch (this.type) {
			case RankingTypes.KINGDOM_RANK:
				return { property: 'rank', color: '#00d1b2', label: 'Kingdom Power' }
			case RankingTypes.KINGDOM_POWER:
				return { property: 'power', color: '#ebfffc', label: 'Kingdom Power' }
			case RankingTypes.TOURNEY_RANK:
				return { property: 'rank', color: '#00d1b2', label: 'Tourney Points' }
			case RankingTypes.TOURNEY_POINTS:
				return { property: 'points', color: '#ebfffc', label: 'Tourney Points' }
			default:
				return { property: 'rank', color: '#00d1b2', label: 'Kingdom Power' }
			}
		},
		graphData (): ChartData & any {
			return {
				plugins: [ChartDataLabels],
				labels: this.data.map((rank: Ranking) => format(new Date(rank.date), 'dd-MM')),
				datasets: [
					{
						data: this.data.map((rank: any) => ({ ...rank, toString: () => rank[this.config.property] })),
						borderColor: this.config.color,
						label: this.config.label,
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
