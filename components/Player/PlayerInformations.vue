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
				<div v-if="rank" class="stat">{{ rank.power }} <span class="stat-label">KP</span></div>
				<div v-if="rank" class="stat"><span class="stat-label">Level</span> {{ rank.level }}</div>
				<div v-if="alliance" class="stat">{{ alliance.name }}</div>
			</div>
			<div class="stats">
				<div class="stat">{{ player.heroes }} <span class="stat-label">Heroes</span></div>
				<div class="stat">{{ player.maidens }} <span class="stat-label">Maidens</span></div>
				<div class="stat">{{ player.children }} <span class="stat-label">Children</span></div>
			</div>
		</div>
		<div class="card-content">
			<player-rankings-graph />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance, Player, KingdomRanking } from '~/types/types'
import PlayerRankingsGraph from '~/components/Player/PlayerRankingsGraph.vue'
const ordinal = require('ordinal-numbers')

export default Vue.extend({
	name: 'PlayerInformations',
	components: { PlayerRankingsGraph },
	data: () => ({ ordinal }),
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
	.stat {flex: 1;}
	.stat-label {
		color: var(--text-color-muted);
	}
}
</style>
