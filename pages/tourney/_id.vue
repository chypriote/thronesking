<template>
	<div class="content">
		<div class="card bordered">
			<player-details-header :player="player" :rank="rank.rank" />
			<div class="card-content">
				<player-stats :player="player" />
			</div>
			<div class="card-content">
				<div class="graph">
					<div class="graph-legend">Tourney Rank</div>
					<tourney-rank-graph />
				</div>
				<div class="graph">
					<div class="graph-legend">Tourney Points</div>
					<tourney-points-graph />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player, TourneyRanking } from '~/types'
import PlayerStats from '~/components/PlayerStats.vue'
import PlayerDetailsHeader from '~/components/Players/PlayerDetailsHeader.vue'
import TourneyPointsGraph from '~/components/Tourney/TourneyPointsGraph.vue'
import TourneyRankGraph from '~/components/Tourney/TourneyRankGraph.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { TourneyPointsGraph, TourneyRankGraph, PlayerStats, PlayerDetailsHeader },
	async asyncData ({ store, route }): Promise<void> {
		await Promise.all([
			store.dispatch('FETCH_PLAYER', route.params.id),
			store.dispatch('ladder/tourney/FETCH_PLAYER_RANKINGS', route.params.id),
		])
	},
	computed: {
		player (): Player { return this.$store.state.player },
		rank (): TourneyRanking|undefined { return this.player.rankings.tourney },
	},
})
</script>
