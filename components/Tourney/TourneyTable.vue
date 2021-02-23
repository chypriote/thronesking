<template>
	<div class="table-container">
		<table class="table leaderboard is-hoverable">
			<thead>
			<tr>
				<th>Rank</th>
				<th>Name</th>
				<th>Points</th>
				<th>Heroes</th>
				<th>Ratio</th>
				<th>% Scout</th>
			</tr>
			</thead>
			<tbody>
			<tr v-if="loading"><td colspan="6">
				<div class="loader-wrapper">
					<span class="loader" />
				</div>
			</td></tr>
			<template v-else>
				<tourney-row v-for="(rank, index) of players" :key="rank.id" :rank="rank" :index="index" />
				<tr v-if="!players.length"><td colspan="6">No Results</td></tr>
			</template>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TourneyRanking } from '~/types'
import TourneyRow from '~/components/Tourney/TourneyRow.vue'

export default Vue.extend({
	name: 'TourneyTable',
	components: { TourneyRow },
	computed: {
		loading (): boolean { return this.$store.state.ladder.tourney.loading },
		players (): TourneyRanking[] { return this.$store.state.ladder.tourney.ladder },
	},
})
</script>

<style scoped>
th {
	white-space: nowrap;
}
table tbody td .loader-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 8rem;
	width: 100%;
}
.loader {
	height: 5rem;
	width: 5rem;
}
</style>
