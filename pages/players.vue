<template>
	<div class="columns">
		<div class="column" :class="{'is-three-fifths': $route.name === 'players-id'}">
			<div class="card">
				<div class="card-content">
					<ranking-table />
				</div>
			</div>
		</div>
		<div v-if="$route.name === 'players-id'" class="column is-two-fifths">
			<div class="sticky">
				<nuxt-child />
			</div>
		</div>
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
