<template>
	<div class="table-container">
		<table class="table leaderboard is-hoverable">
			<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Heroes</th>
				<th>Power</th>
				<th>VIP</th>
				<th>Alliance</th>
			</tr>
			</thead>
			<tbody>
				<player-row v-for="player of players" :key="player.id" :player="player" />
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
		players (): Player[] { return this.$store.state.players },
	},
})
</script>
