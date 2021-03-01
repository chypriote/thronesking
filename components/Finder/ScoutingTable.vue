<template>
	<div class="table-container">
		<table class="table leaderboard is-hoverable">
			<thead>
			<tr>
				<th>GID</th>
				<th>Name</th>
				<th>Rating</th>
				<th>Heroes</th>
				<th>Power</th>
				<th>Ratio</th>
				<th>Scouted</th>
				<th>VIP</th>
			</tr>
			</thead>
			<tbody>
				<tr v-if="loading"><td colspan="7">
					<div class="loader-wrapper">
						<span class="loader" />
					</div>
				</td></tr>
				<template v-else>
					<scouting-row v-for="player of players" :key="player.gid" :player="player" />
					<tr v-if="quality && !players.length"><td colspan="8">No Results</td></tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import ScoutingRow from '~/components/Finder/ScoutingRow.vue'
import { Player } from '~/types'

export default Vue.extend({
	name: 'ScoutingTable',
	components: { ScoutingRow },
	computed: {
		loading (): Boolean { return this.$store.state.finder.loading },
		players (): Player[] { return this.$store.state.finder.players },
		quality (): Player[] { return this.$store.state.finder.quality },
	},
})
</script>
