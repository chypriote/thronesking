<template>
	<div class="columns">
		<main class="column">
			<players-table />
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayersTable from '~/components/Players/PlayersTable.vue'

export default Vue.extend({
	name: 'PlayerssIndex',
	components: { PlayersTable },
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
