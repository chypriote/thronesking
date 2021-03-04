<template>
	<div>
		<div class="columns sticky">
			<div class="column is-one-third">
				<players-search />
			</div>
			<div class="column is-half">
				<players-order />
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<players-table />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayersTable from '~/components/Players/PlayersTable.vue'
import PlayersSearch from '~/components/Players/PlayersSearch.vue'
import PlayersOrder from '~/components/Players/PlayersOrder.vue'

export default Vue.extend({
	name: 'PlayersIndex',
	components: { PlayersTable, PlayersSearch, PlayersOrder },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('FETCH_PLAYERS')
	},
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 0;
	z-index: 2;
}
</style>
