<template>
	<line-chart :chart-data="graphData" :options="options" :height="250" />
</template>

<script lang="ts">
import Vue from 'vue'
import { ChartData } from 'chart.js'
import { find } from 'lodash-es'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { format, differenceInHours } from 'date-fns'
import { KingdomRanking, TourneyRanking } from '~/types'
import { Colors, defaultDataLabel, defaultOptions } from '~/components/Global/Graph'
const ordinal = require('ordinal-numbers')

export default Vue.extend({
	name: 'PlayerPeekGraph',
	data: () => ({ options: defaultOptions({ stepSize: 1, suggestedMin: 1, reverse: true }, { display: true }) }),
	computed: {
		kingdomData (): KingdomRanking[] { return this.$store.state.ladder.kingdom_rankings },
		tourneyData (): TourneyRanking[] { return this.$store.state.ladder.tourney_rankings },
		graphData (): ChartData & any {
			const dates = this.kingdomData.map((rank: KingdomRanking) => new Date(rank.date))
			const kingdomSet = []
			const tourneySet = []

			dates.forEach((date: Date) => {
				const kd = find(this.kingdomData, (it: KingdomRanking) => !differenceInHours(new Date(it.date), date))
				const tn = find(this.tourneyData, (it: TourneyRanking) => !differenceInHours(new Date(it.date), date))
				kingdomSet.push(kd ? { ...kd, toString: () => kd.rank } : null)
				tourneySet.push(tn ? { ...tn, toString: () => tn.rank } : null)
			})

			return {
				plugins: [ChartDataLabels],
				labels: dates.map((date: Date) => format(date, 'dd-MM')),
				datasets: [
					{
						data: kingdomSet,
						borderColor: Colors.PRIMARY,
						label: 'Kingdom Rank',
						datalabels: defaultDataLabel((e: KingdomRanking|null) => e ? `${ordinal(e.rank)}\n${Number(e.power).toLocaleString()} KP` : null),
					},
					{
						data: tourneySet,
						borderColor: Colors.LIGHT,
						label: 'Tourney Rank',
						datalabels: defaultDataLabel((e: TourneyRanking|null) => e ? `${ordinal(e.rank)}\n${Number(e.points).toLocaleString()} TP` : null),
					},
				],
			}
		},
	},
})
</script>
