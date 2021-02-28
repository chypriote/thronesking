<template>
	<tr :class="{'is-selected': selected && selected.id === player.id}">
		<td class="rank">
			<div :class="{'ribbon': [0, 1, 2].includes(index), 'placing-1': index === 0, 'placing-2': index===1, 'placing-3': index ===2}">
				<svg v-if="[0, 1, 2].includes(index)" viewBox="0 0 20 13.333" class="icon"><path d="M4.868 13.333H15.13l4.444-8.889h-5.556L11.797 0h-3.6L5.975 4.444H.419zm2.484-6.667l2.222-4.444h.849l2.222 4.444h3.333l-2.222 4.444H6.242L4.02 6.666zM0 0h2.222v2.222H0zM17.778 0H20v2.222h-2.222z"></path></svg>
				{{ index + 1 }}
			</div>
		</td>
		<td class="player" @click="selectPlayer">
			<div class="is-flex is-align-items-center">
				<span v-if="player.favorite">⭐</span>
				<span v-if="player.inactive">⏱</span>
				<span class="name">{{ player.name }}</span>
			</div>
		</td>
		<td class="stat kp highlight">
			<span class="hint--top" :aria-label="rank.power |formatted">
				{{ rank.power |numeral }}
			</span>
		</td>
		<td class="stat vip">VIP<span style="font-weight: bold;">{{ player.vip }}</span></td>
		<td class="stat level">{{ rank.level }}</td>
		<td v-if="alliance" class="stat alliance">
			<nuxt-link :key="alliance.id" :to="{name: 'alliances-id', params: {id: alliance.id}}">
				{{ alliance.name }}
			</nuxt-link>
		</td>
		<td v-else>-</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance, Player, KingdomRanking } from '~/types'

export default Vue.extend({
	name: 'RankingRow',
	props: {
		index: {
			type: Number,
			required: true,
		},
		rank: {
			type: Object as () => KingdomRanking,
			required: true,
		},
	},
	computed: {
		selected () { return this.$store.state.ladder.player },
		player (): Player { return this.rank.player },
		alliance (): Alliance|null { return this.rank.alliance },
	},
	methods: {
		async selectPlayer () {
			await this.$store.dispatch('ladder/SELECT_PLAYER', this.player.id)
		},
	},
})
</script>

<style scoped>
td {
	&.rank {padding: 0;position: relative;text-align: center;}
	&.player {
		width: 100%;
		.name {white-space: nowrap;cursor: pointer;}
	}
	&.kp {text-align: right;}
	&.level {margin-bottom: 0;}
}
</style>
