<template>
	<tr>
		<td>{{ player.gid }}</td>
		<td class="player" @click="selectPlayer">
			<nuxt-link :key="player.id" :to="{name: 'players-id', params: {id: player.id}}">
				<span class="name">{{ player.name }}</span>
			</nuxt-link>
		</td>
		<td class="recommendation highlight">
			<div class="recommendation">
				{{ player.recommendation |formatted }}
				<div class="details">
					{{ `(${player.worst}/${player.even}/${player.best})` }}
				</div>
			</div>
		</td>
		<td class="heroes">{{ player.heroes }}</td>
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
		quality: {
			type: Number,
			required: true,
		},
		player: {
			type: Object as () => Player,
			required: true,
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
td {
	&.player {
		width: 100%;
		a {
			display: flex;
			align-items: center;
			&:hover {color: inherit;}
		}
		.name {white-space: nowrap;font-weight: bold;}
	}
	&.heroes, &.ratio, &.scouted, &.vip, &.kp {text-align: right;}
	&.recommendation {text-align: right;overflow: initial;}
	.recommendation {
		display: flex;
		flex-direction: column;
		text-align: right;
		.details {
			display: flex;
			font-size: .75rem;
			line-height: 1;
			justify-content: flex-end;
			color: var(--text-color-medium);
		}
	}
}
</style>
