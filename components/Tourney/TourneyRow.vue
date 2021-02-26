<template>
	<tr :class="{'is-selected': parseInt($route.params.id) === player.id}">
		<td class="rank">
			<div :class="{'ribbon': [0, 1, 2].includes(index), 'placing-1': index === 0, 'placing-2': index===1, 'placing-3': index ===2}">
				<svg v-if="[0, 1, 2].includes(index)" viewBox="0 0 20 13.333" class="icon"><path d="M4.868 13.333H15.13l4.444-8.889h-5.556L11.797 0h-3.6L5.975 4.444H.419zm2.484-6.667l2.222-4.444h.849l2.222 4.444h3.333l-2.222 4.444H6.242L4.02 6.666zM0 0h2.222v2.222H0zM17.778 0H20v2.222h-2.222z"></path></svg>
				{{ index + 1 }}
			</div>
		</td>
		<td class="player" @click="selectPlayer">
			<div class="name">
				<span v-if="player.player_heroes.length">🔍</span>
				<span>{{ player.name }}</span>
			</div>
		</td>
		<td class="stat points highlight">{{ rank.points |formatted }}</td>
		<td class="stat heroes">{{ player.heroes }}</td>
		<td class="stat ratio">{{ rank.ratio |numeral }}</td>
		<td class="stat scout">
			<div v-if="scout" class="scouting">
				<div class="percent">{{ scout |percent }}</div>
				<div class="details">
					<div class="unevolved">{{ basics.length }}</div>
					<div class="qRatio">{{ qRatio }}</div>
				</div>
			</div>
			<span v-else>-</span>
		</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy, reduce } from 'lodash-es'
import { Player, PlayerHeroes, TourneyRanking } from '~/types'

export default Vue.extend({
	name: 'RankingRow',
	props: {
		index: {
			type: Number,
			required: true,
		},
		rank: {
			type: Object as () => TourneyRanking,
			required: true,
		},
	},
	computed: {
		player (): Player { return this.rank.player },
		scout (): number|null {
			if (!this.player.player_heroes) { return null }
			return (this.player.player_heroes.length / this.player.heroes * 100) || null
		},
		basics (): PlayerHeroes[]|undefined {
			if (!this.scout || !this.player.player_heroes) { return }
			return this.player.player_heroes.filter(h => h.quality - h.base < 4 || h.quality < 18)
		},
		qRatio (): string|number|undefined {
			if (!this.scout || !this.player.player_heroes || !this.player.player_heroes.length) { return }
			if (this.player.player_heroes.length < 2) { return this.player.player_heroes[0].quality }

			const roster = orderBy(this.player.player_heroes, 'quality', 'desc')
			roster.shift()
			const totalQuality = reduce(roster, (sum: number, h: PlayerHeroes) => { return sum + h.quality }, 0)
			return (totalQuality / roster.length).toFixed(1)
		},
	},
	methods: {
		async selectPlayer () {
			await this.$store.dispatch('ladder/SELECT_PLAYER', this.player.id)
		},
	},
})
</script>

<style scoped>
table.scouting td {padding: 0;}
td {
	&.rank {padding: 0;position: relative;text-align: center;}
	&.player {
		width: 100%;
		.name {
			display: flex;
			align-items: center;
			white-space: nowrap;
			cursor: pointer;
		}
	}
	&.points, &.ratio, &.heroes, &.scout {text-align: right;}
}
.scouting {
	display: flex;
	flex-direction: column;
	.details {
		display: flex;
		font-size: .75rem;
		line-height: 1;
		justify-content: space-between;
		color: var(--text-color-muted);
	}
}
</style>
