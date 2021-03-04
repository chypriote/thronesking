<template>
	<div class="card bordered">
		<header><h2 class="title is-5">Kingdom Power</h2></header>
		<div class="card-content">
			<div class="table-container">
			<table class="table leaderboard is-hoverable">
				<thead>
				<tr>
					<th colspan="2">Name</th>
					<th>Power</th>
				</tr>
				</thead>
				<tbody>
				<tr v-if="loading"><td colspan="3">
					<div class="loader-wrapper">
						<span class="loader" />
					</div>
				</td></tr>
				<template v-else>
				<tr v-for="(player, index) of players" :key="`kingdom-${player.id}`">
					<td class="rank">
						<div :class="{'ribbon': [0, 1, 2].includes(index), 'placing-1': index === 0, 'placing-2': index===1, 'placing-3': index ===2}">
							<svg v-if="[0, 1, 2].includes(index)" viewBox="0 0 20 13.333" class="icon"><path d="M4.868 13.333H15.13l4.444-8.889h-5.556L11.797 0h-3.6L5.975 4.444H.419zm2.484-6.667l2.222-4.444h.849l2.222 4.444h3.333l-2.222 4.444H6.242L4.02 6.666zM0 0h2.222v2.222H0zM17.778 0H20v2.222h-2.222z"></path></svg>
							{{ index + 1 }}
						</div>
					</td>
					<td class="td-name">
						<nuxt-link :to="{name: 'players-id', params: {id: player.player.id}}">{{ player.player.name }}</nuxt-link>
					</td>
					<td class="td-power">
						<span class="hint--top" :aria-label="player.power |formatted">
							{{ player.power |numeral }}
						</span>
					</td>
				</tr>
				</template>
				</tbody>
			</table>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { KingdomRanking } from '~/types'

interface IData {
	players: KingdomRanking[]
	loading: boolean
}

export default Vue.extend({
	name: 'Kingdom',
	data: (): IData => ({ players: [], loading: false }),
	async mounted () {
		await this.getKingdomLadder()
	},
	methods: {
		async getKingdomLadder () {
			this.loading = true
			this.players = await this.$strapi.find('ladders/kingdom', { _limit: 10 })
			this.loading = false
		},
	},
})
</script>

<style scoped>
.td-power {text-align: right;}
.td-name {
	padding: 0 1rem;
	a {padding: .75rem;}
	a:hover {color: var(--text-color-primary);}
}
</style>
