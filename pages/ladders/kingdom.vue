<template>
	<div class="columns">
		<main class="column is-two-thirds">
			<kingdom-table />
		</main>
		<aside class="column is-one-third">
			<div class="sticky">
				<player-peek />
			</div>
		</aside>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import PlayerPeek from '~/components/Global/PlayerPeek.vue'
import KingdomTable from '~/components/Kingdom/KingdomTable.vue'

export default Vue.extend({
	name: 'KingdomIndex',
	components: { KingdomTable, PlayerPeek },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('ladder/kingdom/FETCH_LADDER')
	},
	head: (): MetaInfo => ({ title: 'Kingdom power ladder' }),
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 0;
}
</style>
