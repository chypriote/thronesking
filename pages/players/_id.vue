<template>
	<div class="content">
		<player-informations />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerInformations from '~/components/Player/PlayerInformations.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { PlayerInformations },
	async asyncData ({ store, route }): Promise<void> {
		await Promise.all([
			store.dispatch('FETCH_PLAYER', route.params.id),
			store.dispatch('FETCH_PLAYER_KINGDOM_RANKINGS', route.params.id),
			store.dispatch('FETCH_PLAYER_TOURNEY_RANKINGS', route.params.id),
		])
	},
})
</script>
