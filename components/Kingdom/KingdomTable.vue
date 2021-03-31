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
			<kingdom-row v-for="(player, index) of players" :key="player.id" :player="player" :index="index" />
		</tbody>
	</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import KingdomRow from '~/components/Kingdom/KingdomRow.vue'
import { Player } from '~/types'

export default Vue.extend({
	name: 'RankingTable',
	components: { KingdomRow },
	data: () => ({ loading: true }),
	computed: {
		players (): Player[] { return this.$store.state.ladder.ladder },
	},
})
</script>
