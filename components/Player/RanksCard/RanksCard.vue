<template>
	<div class="card bordered">
		<header class="is-flex is-align-items-center is-justify-content-space-between">
			<h3 class="title is-5">Ranks</h3>
			<button class="button --primary" @click="getRankings">Load</button>
		</header>
		<div class="card-content">
			<div v-if="loading" class="loader-wrapper">
				<div class="loader" />
			</div>
			<template v-else>
			<div class="columns">
				<div class="column">
					<div v-if="kingdom_rankings.length" class="graph">
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
					<div v-if="kingdom_rankings.length" class="graph">
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
import KingdomRankGraph from '~/components/Player/RanksCard/KingdomRankGraph.vue'
import KingdomPowerGraph from '~/components/Player/RanksCard/KingdomPowerGraph.vue'
import TourneyRankGraph from '~/components/Player/RanksCard/TourneyRankGraph.vue'
import TourneyPointsGraph from '~/components/Player/RanksCard/TourneyPointsGraph.vue'
import { KingdomRanking, TourneyRanking } from '~/types'

export default Vue.extend({
	name: 'RanksCard',
	components: { KingdomRankGraph, TourneyRankGraph, KingdomPowerGraph, TourneyPointsGraph },
	data: () => ({ loading: false }),
	computed: {
		kingdom_rankings (): KingdomRanking[] { return this.$store.state.player.kingdom_rankings },
		tourney_rankings (): TourneyRanking[] { return this.$store.state.player.tourney_rankings },
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
