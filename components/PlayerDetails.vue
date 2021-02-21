<template>
	<div class="card bordered">
		<header>
			<div class="player">
				<h2>{{ player.name }}</h2>
				<p class="subtitle">{{ `VIP${player.vip}` }} - {{ player.gid }}</p>
			</div>
			<div v-if="rank" class="rank">{{ ordinal(rank.rank) }}</div>
		</header>
		<div class="card-content">
			<player-stats />
		</div>
		<div class="card-content">
			<div class="graph">
				<div class="graph-legend">Kingdom Power Rank</div>
				<player-rankings-graph :type="RankingTypes.KINGDOM" />
			</div>
			<div class="graph">
				<div class="graph-legend">Tourney Rank</div>
				<player-rankings-graph :type="RankingTypes.TOURNEY" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player, KingdomRanking, RankingTypes } from '~/types'
import PlayerRankingsGraph from '~/components/PlayerRankingsGraph.vue'
import PlayerStats from '~/components/PlayerStats.vue'
const ordinal = require('ordinal-numbers')

export default Vue.extend({
	name: 'PlayerInformations',
	components: { PlayerStats, PlayerRankingsGraph },
	data: () => ({ ordinal, RankingTypes }),
	computed: {
		player (): Player { return this.$store.state.player },
		rank (): KingdomRanking|null { return this.player.rank || null },
	},
})
</script>

<style scoped>
header {
	display: flex;
	.player {
		flex-grow: 1;
	}
	.rank {
		font-size: 2rem;
		font-weight: bold;
		color: var(--text-color-primary);
	}
}
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
