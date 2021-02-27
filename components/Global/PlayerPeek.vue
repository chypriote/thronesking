<template>
	<div class="card bordered">
		<div v-if="loading" class="card-content loader-wrapper">
			<div class="loader" />
		</div>
		<template v-else>
			<template v-if="player">
				<player-details-header :player="player" />
				<div class="card-content">
					<player-stats :player="player" />
				</div>
				<div v-if="player.roster.length" class="card-content analysis">
					<header>Analysis</header>
					<player-analysis :player="player" />
					{{ player.notes }}
				</div>
				<div class="card-content">
					<header>Rank</header>
					<player-peek-graph />
				</div>
			</template>
			<div v-else class="card-content">Select a player</div>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'
import PlayerStats from '~/components/Global/PlayerStats.vue'
import PlayerPeekGraph from '~/components/Global/PlayerPeekGraph.vue'
import PlayerDetailsHeader from '~/components/Global/PlayerDetailsHeader.vue'
import PlayerAnalysis from '~/components/Global/PlayerAnalysis.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { PlayerAnalysis, PlayerPeekGraph, PlayerStats, PlayerDetailsHeader },
	computed: {
		loading (): boolean { return this.$store.state.ladder.loading },
		player (): Player { return this.$store.state.ladder.player },
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
.analysis {
	border-bottom: 1px solid var(--foreground-color-medium-contrast);
	border-top: 1px solid var(--foreground-color-medium-contrast);
}
</style>
