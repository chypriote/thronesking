<template>
	<div class="columns">
		<main class="column is-two-thirds">
			<tourney-filters class="tourney-filters" />
			<tourney-table />
		</main>
		<aside v-if="$route.name === 'tourney-id'" class="column is-one-third">
			<div class="sticky">
				<nuxt-child />
			</div>
		</aside>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import TourneyTable from '~/components/Tourney/TourneyTable.vue'
import TourneyFilters from '~/components/Tourney/TourneyFilters.vue'

export default Vue.extend({
	name: 'TourneyIndex',
	components: { TourneyTable, TourneyFilters },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('ladder/tourney/FETCH_LADDER')
	},
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 4.75rem;
}
</style>

<style scoped>
.tourney-filters {
	margin-bottom: 1.5rem;
}
</style>
