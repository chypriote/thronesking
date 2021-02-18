<template>
	<div class="columns">
		<div class="column is-three-fifths">
			<div class="card">
				<div class="card-content">
					<alliance-table />
				</div>
			</div>
		</div>
		<div class="column is-two-fifths">
			<div class="sticky">
				<nuxt-child />
			</div>
		</div>
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
	top: 4.75rem;
}
</style>
