<template>
	<div class="card bordered">
		<player-details-header :player="player" :rank="rank.rank" />
		<div class="card-content">
			<player-stats :player="player" />
		</div>
		<div class="card-content">
			<div class="graph">
				<div class="graph-legend">Kingdom Power Rank</div>
				<player-rankings-graph :type="RankingTypes.KINGDOM_RANK" />
			</div>
			<div class="graph">
				<div class="graph-legend">Tourney Rank</div>
				<player-rankings-graph :type="RankingTypes.TOURNEY_RANK" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player, RankingTypes, KingdomRanking } from '~/types'
import PlayerRankingsGraph from '~/components/PlayerRankingsGraph.vue'
import PlayerStats from '~/components/PlayerStats.vue'
import PlayerDetailsHeader from '~/components/Players/PlayerDetailsHeader.vue'
const ordinal = require('ordinal-numbers')

export default Vue.extend({
	name: 'PlayerInformations',
	components: { PlayerDetailsHeader, PlayerStats, PlayerRankingsGraph },
	data: () => ({ ordinal, RankingTypes }),
	computed: {
		player (): Player { return this.$store.state.player },
		rank (): KingdomRanking|undefined { return this.player.rankings.kingdom },
	},
})
</script>

<style scoped>
.graph-legend {
	font-size: .75rem;
	text-transform: uppercase;
	color: var(--text-color-medium);
	margin-bottom: .25rem;
}
.graph + .graph {
	margin-top: 1.5rem;
}
</style>
