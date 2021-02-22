<template>
	<div class="card bordered">
		<header><h3 class="title is-5">Ranks</h3></header>
		<div class="card-content">
			<div class="columns">
				<div class="column">
					<div class="graph">
						<div class="graph-legend">Kingdom Power</div>
						<kingdom-rank-graph />
					</div>
				</div>
				<div class="column">
					<div class="graph">
						<div class="graph-legend">Tourney </div>
						<tourney-rank-graph />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import KingdomRankGraph from '~/components/Kingdom/KingdomRankGraph.vue'
import TourneyRankGraph from '~/components/Tourney/TourneyRankGraph.vue'

export default Vue.extend({
	name: 'RanksCard',
	components: { KingdomRankGraph, TourneyRankGraph },
})
</script>

<style scoped>
.graph-legend {
	font-size: .75rem;
	text-transform: uppercase;
	color: var(--text-color-medium);
	margin-bottom: .25rem;
}
</style>
