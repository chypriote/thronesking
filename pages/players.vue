<template>
	<div class="columns">
		<main class="column is-two-thirds">
			<ranking-table />
		</main>
		<aside v-if="$route.name === 'players-id'" class="column is-one-third">
			<div class="sticky">
				<nuxt-child />
			</div>
		</aside>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import RankingTable from '~/components/Player/RankingTable.vue'

export default Vue.extend({
	name: 'PlayersIndex',
	components: { RankingTable },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('FETCH_PLAYERS')
	},
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 4.75rem;
}
</style>
