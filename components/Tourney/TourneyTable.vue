<template>
	<div class="table-container">
		<table class="table leaderboard is-hoverable">
			<thead>
			<tr>
				<th>Rank</th>
				<th>Name</th>
				<th>Points</th>
				<th>Heroes</th>
			</tr>
			</thead>
			<tbody>
				<tourney-row v-for="(rank, index) of players" :key="rank.id" :rank="rank" :index="index" />
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'
import TourneyRow from '~/components/Tourney/TourneyRow.vue'

export default Vue.extend({
	name: 'TourneyTable',
	components: { TourneyRow },
	data: () => ({ loading: true }),
	computed: {
		players (): Player[] { return this.$store.state.tourney_ladder },
	},
})
</script>
