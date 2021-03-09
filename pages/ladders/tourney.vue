<template>
	<div class="columns">
		<main class="column is-two-thirds">
			<tourney-filters class="tourney-filters" />
			<tourney-table />
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
import TourneyTable from '~/components/Tourney/TourneyTable.vue'
import TourneyFilters from '~/components/Tourney/TourneyFilters.vue'
import PlayerPeek from '~/components/Global/PlayerPeek.vue'

export default Vue.extend({
	name: 'TourneyIndex',
	components: { TourneyTable, TourneyFilters, PlayerPeek },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('ladder/tourney/FETCH_LADDER')
	},
	head: (): MetaInfo => ({ title: 'Tourney ladder' }),
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 0;
}
.tourney-filters {
	margin-bottom: 1.5rem;
}
</style>
