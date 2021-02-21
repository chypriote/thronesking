<template>
	<div class="table-container">
	<table class="table leaderboard is-hoverable">
		<thead>
			<tr>
				<th>Rank</th>
				<th>Name</th>
				<th>Power</th>
				<th>VIP</th>
				<th>Level</th>
				<th>Alliance</th>
			</tr>
		</thead>
		<tbody>
			<ranking-row v-for="(rank, index) of players" :key="rank.id" :rank="rank" :index="index" />
		</tbody>
	</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import RankingRow from '~/components/Player/RankingRow.vue'
import { Player } from '~/types'

export default Vue.extend({
	name: 'RankingTable',
	components: { RankingRow },
	data: () => ({ loading: true }),
	computed: {
		players (): Player[] { return this.$store.state.players },
	},
})
</script>

<style scoped>
th {
	position: sticky;
	top: 0;
	z-index: 10;
}
</style>
