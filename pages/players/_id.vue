<template>
	<div class="content">
		<div class="columns">
			<div class="column is-one-quarter">
				<div class="card bordered">
					<player-details-header :player="player" />
					<div class="card-content">
						<player-stats :player="player" />
					</div>
				</div>
			</div>
			<div class="column is-three-quarters">

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'
import PlayerDetailsHeader from '~/components/Players/PlayerDetailsHeader.vue'
import PlayerStats from '~/components/PlayerStats.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { PlayerStats, PlayerDetailsHeader },
	async asyncData ({ store, route }): Promise<void> {
		await store.dispatch('FETCH_PLAYER', route.params.id)
	},
	computed: {
		player (): Player { return this.$store.state.player },
	},
})
</script>
