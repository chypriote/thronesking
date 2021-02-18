<template>
	<div class="content">
		<div class="card">
			<div class="card-content">
				<player-informations v-if="player" />
			</div>
			<player-rank-graph v-if="player" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import PlayerInformations from '~/components/Player/PlayerInformations.vue'
import PlayerRankGraph from '~/components/Player/PlayerRankGraph.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { PlayerInformations, PlayerRankGraph },
	async asyncData ({ store, route }): Promise<void> {
		await store.dispatch('FETCH_PLAYER', route.params.id)
	},
	computed: {
		...mapState(['player']),
	},
})
</script>
