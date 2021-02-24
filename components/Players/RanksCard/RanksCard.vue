<template>
	<div class="card bordered">
		<header><h3 class="title is-5">Ranks</h3></header>
		<div class="card-content">
			<div v-if="loading" class="loader-wrapper">
				<div class="loader" />
			</div>
			<template v-else>
			<div class="columns">
				<div class="column">
					<div class="graph">
						<div class="graph-legend">Kingdom Rank</div>
						<kingdom-rank-graph />
					</div>
				</div>
				<div class="column">
					<div v-if="tourney_rankings.length" class="graph">
						<div class="graph-legend">Tourney Rank</div>
						<tourney-rank-graph />
					</div>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<div class="graph">
						<div class="graph-legend">Kingdom Power</div>
						<kingdom-power-graph />
					</div>
				</div>
				<div class="column">
					<div v-if="tourney_rankings.length" class="graph">
						<div class="graph-legend">Tourney Points</div>
						<tourney-points-graph />
					</div>
				</div>
			</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import KingdomRankGraph from '~/components/Players/RanksCard/KingdomRankGraph.vue'
import KingdomPowerGraph from '~/components/Players/RanksCard/KingdomPowerGraph.vue'
import TourneyRankGraph from '~/components/Players/RanksCard/TourneyRankGraph.vue'
import TourneyPointsGraph from '~/components/Players/RanksCard/TourneyPointsGraph.vue'
import { TourneyRanking } from '~/types'

export default Vue.extend({
	name: 'RanksCard',
	components: { KingdomRankGraph, TourneyRankGraph, KingdomPowerGraph, TourneyPointsGraph },
	data: () => ({ loading: true }),
	computed: {
		tourney_rankings (): TourneyRanking[] { return this.$store.state.player.tourney_rankings },
	},
	watch: {
		'$route.params.id' () { this.getRankings() },
	},
	mounted () {
		this.getRankings()
	},
	methods: {
		async getRankings () {
			this.loading = true
			await Promise.all([
				this.$store.dispatch('player/FETCH_KINGDOM_RANKINGS'),
				this.$store.dispatch('player/FETCH_TOURNEY_RANKINGS'),
			])
			this.loading = false
		},
	},
})
</script>

<style scoped>
.loader-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 8rem;
	width: 100%;
}
.loader {
	height: 5rem;
	width: 5rem;
}
.graph-legend {
	font-size: .75rem;
	text-transform: uppercase;
	color: var(--text-color-medium);
	margin-bottom: .25rem;
}
</style>
