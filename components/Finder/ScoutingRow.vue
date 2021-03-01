<template>
	<tr :class="{'is-selected': selected && selected.id === player.id}">
		<td>{{ player.gid }}</td>
		<td class="player" @click="selectPlayer">
			<div class="is-flex is-align-items-center">
				<span v-if="player.favorite">⭐</span>
				<span v-if="player.inactive">⏱</span>
				<span class="name">{{ player.name }}</span>
			</div>
		</td>
		<td>{{ player.rating }}</td>
		<td class="heroes">
			<div class="heroes">
				{{ player.heroes }}
				<div class="details">{{ `(${player.worst}/${player.even}/${player.best})` }}</div>
			</div>
		</td>
		<td class="kp">
			<span class="hint--top" :aria-label="player.power |formatted">
				{{ player.power |numeral }}
			</span>
		</td>
		<td class="ratio">
			<span class="hint--top" :aria-label="player.ratio |formatted">
				{{ player.ratio |numeral }}
			</span>
		</td>
		<td class="scouted">{{ player.player_heroes.length / player.heroes * 100 |percent }}</td>
		<td class="vip">{{ `VIP${player.vip}` }}</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'

export default Vue.extend({
	name: 'ScoutingRow',
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
	},
	computed: {
		selected (): Player|null { return this.$store.state.ladder.player },
	},
	methods: {
		async selectPlayer (): Promise<void> {
			await this.$store.dispatch('ladder/SELECT_PLAYER', this.player.id)
		},
	},
})
</script>

<style scoped>
td {
	&.player {
		width: 100%;
		cursor: pointer;
		.name {white-space: nowrap;font-weight: bold;}
	}
	&.heroes, &.ratio, &.scouted, &.vip, &.kp {text-align: right;}
	.heroes {
		display: flex;
		align-items: center;
		.details {
			display: flex;
			font-size: .75rem;
			margin-left: .5rem;
			line-height: 1;
			justify-content: flex-end;
			color: var(--text-color-medium);
		}
	}
}
</style>
