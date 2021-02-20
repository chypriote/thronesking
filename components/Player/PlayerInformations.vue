<template>
	<div class="card bordered">
		<header>
			<div class="player">
				<h2>{{ player.name }}</h2>
				<p class="subtitle">{{ `VIP${player.vip}` }}</p>
			</div>
			<div class="rank">{{ ordinal(rank.rank) }}</div>
		</header>
		<div class="card-content">
			<div class="stats">
				<div class="stat">{{ rank.power }} <span class="stat-label">KP</span></div>
				<div class="stat"><span class="stat-label">Level</span> {{ rank.level }}</div>
				<div v-if="alliance" class="stat">{{ alliance.name }}</div>
			</div>
			<div class="stats">
				<div class="stat">{{ player.heroes }} <span class="stat-label">Heroes</span></div>
				<div class="stat">{{ player.maidens }} <span class="stat-label">Maidens</span></div>
				<div class="stat">{{ player.children }} <span class="stat-label">Children</span></div>
			</div>
		</div>
		<div class="card-content">
			<player-rank-graph />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance, Player, Ranking } from '~/types/types'
import PlayerRankGraph from '~/components/Player/PlayerRankGraph.vue'
const ordinal = require('ordinal-numbers')

export default Vue.extend({
	name: 'PlayerInformations',
	components: { PlayerRankGraph },
	data: () => ({ ordinal }),
	computed: {
		player (): Player { return this.$store.state.player },
		alliance (): Alliance|null { return this.player.alliance || null },
		rank (): Ranking|null { return this.player.rank || null },
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
