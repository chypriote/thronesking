<template>
	<div class="content">
		<player-details />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerDetails from '~/components/PlayerDetails.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { PlayerDetails },
	async asyncData ({ store, route }): Promise<void> {
		await Promise.all([
			store.dispatch('FETCH_PLAYER', route.params.id),
			store.dispatch('FETCH_PLAYER_KINGDOM_RANKINGS', route.params.id),
			store.dispatch('FETCH_PLAYER_TOURNEY_RANKINGS', route.params.id),
		])
	},
})
</script>
