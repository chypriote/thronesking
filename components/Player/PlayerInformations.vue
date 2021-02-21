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
			<div class="stats">
				<div v-if="rank" class="stat">
					<span class="stat-label">Kingdom power</span>
					<span class="stat-value">{{ rank.power }}</span>
				</div>
				<div v-if="rank" class="stat">
					<span class="stat-label">Level</span>
					<span class="stat-value">{{ rank.level }}</span>
				</div>
				<div v-if="alliance" class="stat">
					<span class="stat-label">Alliance</span>
					<span class="stat-value">{{ alliance.name }}</span>
				</div>
			</div>
			<div class="stats">
				<div class="stat">
					<span class="stat-label">Heroes</span>
					<span class="stat-value">{{ player.heroes }}</span>
				</div>
				<div class="stat">
					<span class="stat-label">Maidens</span>
					<span class="stat-value">{{ player.maidens }}</span>
				</div>
				<div class="stat">
					<span class="stat-label">Children</span>
					<span class="stat-value">{{ player.children }}</span>
				</div>
			</div>
		</div>
		<div class="card-content">
			<div class="graph">
				<div class="graph-legend">Kingdom Power</div>
				<player-rankings-graph :type="RankingTypes.KINGDOM" />
			</div>
			<div class="graph">
				<div class="graph-legend">Tourney Points</div>
				<player-rankings-graph :type="RankingTypes.TOURNEY" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance, Player, KingdomRanking, RankingTypes } from '~/types'
import PlayerRankingsGraph from '~/components/Player/PlayerRankingsGraph.vue'
const ordinal = require('ordinal-numbers')

export default Vue.extend({
	name: 'PlayerInformations',
	components: { PlayerRankingsGraph },
	data: () => ({ ordinal, RankingTypes }),
	computed: {
		player (): Player { return this.$store.state.player },
		alliance (): Alliance|null { return this.player.alliance || null },
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
.stats {
	display: flex;
	text-align: left;
	line-height: 1;
	&:not(:last-of-type) {margin-bottom: 1rem;}
	.stat {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.stat-label {
		font-size: .6rem;
		color: var(--text-color-medium);
		text-transform: uppercase;
		margin-bottom: .25rem;
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
