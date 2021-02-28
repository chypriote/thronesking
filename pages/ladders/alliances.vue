<template>
	<div class="columns">
		<main class="column is-two-thirds">
			<alliance-table />
		</main>
		<aside v-if="$route.name === 'alliances-id'" class="column is-one-third">
			<div class="sticky">
				<nuxt-child />
			</div>
		</aside>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import AllianceTable from '~/components/Alliance/AllianceTable.vue'

export default Vue.extend({
	name: 'AlliancesIndex',
	components: { AllianceTable },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('FETCH_ALLIANCES')
	},
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 0;
}
</style>
