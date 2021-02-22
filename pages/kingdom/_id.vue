<template>
	<div class="content">
		<div class="card bordered">
			<player-details-header :player="player" :rank="rank.rank" />
			<div class="card-content">
				<player-stats :player="player" />
			</div>
			<div class="card-content">
				<div class="graph">
					<div class="graph-legend">Kingdom Power Rank</div>
					<kingdom-rank-graph />
				</div>
				<div class="graph">
					<div class="graph-legend">Kingdom Power</div>
					<kingdom-power-graph />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player, KingdomRanking } from '~/types'
import PlayerStats from '~/components/PlayerStats.vue'
import PlayerDetailsHeader from '~/components/Players/PlayerDetailsHeader.vue'
import KingdomRankGraph from '~/components/Kingdom/KingdomRankGraph.vue'
import KingdomPowerGraph from '~/components/Kingdom/KingdomPowerGraph.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { KingdomPowerGraph, KingdomRankGraph, PlayerStats, PlayerDetailsHeader },
	async asyncData ({ store, route }): Promise<void> {
		await Promise.all([
			store.dispatch('FETCH_PLAYER', route.params.id),
			store.dispatch('ladder/kingdom/FETCH_PLAYER_RANKINGS', route.params.id),
		])
	},
	computed: {
		player (): Player { return this.$store.state.player },
		rank (): KingdomRanking|undefined { return this.player.rankings.kingdom },
	},
})
</script>
