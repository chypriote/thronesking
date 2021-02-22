<template>
	<div class="columns">
		<main class="column">
			<players-search />
			<players-table />
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayersTable from '~/components/Players/PlayersTable.vue'
import PlayersSearch from '~/components/Players/PlayersSearch.vue'

export default Vue.extend({
	name: 'PlayersIndex',
	components: { PlayersTable, PlayersSearch },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('FETCH_PLAYERS')
	},
})
</script>
