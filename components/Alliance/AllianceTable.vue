<template>
	<div class="table-container">
	<table class="table leaderboard is-hoverable">
		<thead>
		<tr>
			<th class="rank">Rank</th>
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
import AllianceRow from '~/components/Alliance/AllianceRow.vue'
import { Alliance } from '~/types/types'

export default Vue.extend({
	name: 'AllianceTable',
	components: { AllianceRow },
	computed: {
		alliances (): Alliance[] { return this.$store.state.alliances },
	},
})
</script>
