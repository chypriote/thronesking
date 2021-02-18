<template>
	<div class="content">
		<player-informations v-if="player" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import PlayerInformations from '~/components/PlayerInformations.vue'

export default Vue.extend({
	name: 'IndexId',
	components: { PlayerInformations },
	async asyncData ({ store, route }): Promise<void> {
		await store.dispatch('FETCH_PLAYER', route.params.id)
	},
	computed: {
		...mapState(['player']),
	},
})
</script>
