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
			<kingdom-row v-for="(rank, index) of players" :key="rank.id" :rank="rank" :index="index" />
		</tbody>
	</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import KingdomRow from '~/components/Kingdom/KingdomRow.vue'
import { KingdomRanking } from '~/types'

export default Vue.extend({
	name: 'RankingTable',
	components: { KingdomRow },
	data: () => ({ loading: true }),
	computed: {
		players (): KingdomRanking[] { return this.$store.state.ladder.kingdom.ladder },
	},
})
</script>
