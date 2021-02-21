<template>
	<div class="columns">
		<main class="column is-two-thirds">
			<kingdom-table />
		</main>
		<aside v-if="$route.name === 'kingdom-id'" class="column is-one-third">
			<div class="sticky">
				<nuxt-child />
			</div>
		</aside>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import KingdomTable from '~/components/Kingdom/KingdomTable.vue'

export default Vue.extend({
	name: 'KingdomIndex',
	components: { KingdomTable },
	async asyncData ({ store }): Promise<void> {
		await store.dispatch('FETCH_KINGDOM_LADDER')
	},
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 4.75rem;
}
</style>
