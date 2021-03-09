<template>
	<div class="table-container">
		<table class="table leaderboard is-hoverable">
			<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>VIP</th>
				<th>Power</th>
				<th>Level</th>
				<th>Heroes</th>
				<th>Maiden</th>
				<th>Ratio</th>
			</tr>
			</thead>
			<tbody>
				<tr v-if="loading"><td colspan="8">
					<div class="loader-wrapper">
						<span class="loader" />
					</div>
				</td></tr>
				<template v-else>
					<player-row v-for="player of players" :key="player.id" :player="player" />
					<tr v-if="!players.length"><td colspan="8">No Results</td></tr>
				</template>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerRow from '~/components/Players/PlayerRow.vue'
import { Player } from '~/types'

export default Vue.extend({
	name: 'PlayersTable',
	components: { PlayerRow },
	computed: {
		loading (): Boolean { return this.$store.state.loading },
		players (): Player[] { return this.$store.state.players },
	},
})
</script>
