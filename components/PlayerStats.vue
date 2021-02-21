<template>
	<div>
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
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance, KingdomRanking, Player } from '~/types'

export default Vue.extend({
	name: 'PlayerStats',
	computed: {
		player (): Player { return this.$store.state.player },
		alliance (): Alliance|null { return this.player.alliance || null },
		rank (): KingdomRanking|null { return this.player.rank || null },
	},
})
</script>

<style scoped>
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
</style>
