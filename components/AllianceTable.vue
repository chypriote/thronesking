<template>
	<div class="table-container">
	<table class="table is-striped">
		<thead>
		<tr>
			<th>Rank</th>
			<th>Name</th>
			<th>Power</th>
			<th>Reputation</th>
			<th>Level</th>
		</tr>
		</thead>
		<tbody>
			<alliance-row v-for="(alliance, index) of alliances" :key="alliance.id" :alliance="alliance" :index="index" />
		</tbody>
	</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import AllianceRow from '~/components/AllianceRow.vue'

export default Vue.extend({
	name: 'AllianceTable',
	components: { AllianceRow },
	computed: {
		...mapState(['alliances']),
	},
	async created () {
		await this.$store.dispatch('FETCH_ALLIANCES')
	},
})
</script>

<style scoped>
.table {width: 100%;}
</style>
