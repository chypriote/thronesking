<template>
	<tr :class="{'is-selected': parseInt($route.params.id) === player.id}">
		<td class="stat gid">{{ player.gid }}</td>
		<td class="player">
			<nuxt-link :key="player.id" :to="{name: 'players-id', params: {id: player.id}}">
				<span class="name">{{ player.name }}</span>
			</nuxt-link>
		</td>
		<td class="stat vip">{{ player.vip }}</td>
		<td class="stat kp highlight">
			<span class="hint--top" :aria-label="player.power |formatted">
				{{ player.power |numeral }}
			</span>
		</td>
		<td class="stat level-value">{{ player.level }}</td>
		<td class="stat heroes">{{ player.heroes }}</td>
		<td class="stat maidens">{{ player.maidens }}</td>
		<td class="stat children">{{ player.children }}</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'
const numeral = require('numeral')

export default Vue.extend({
	name: 'PlayerRow',
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
	},
	data: () => ({ numeral }),
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
	&.level-value, &.vip, &.heroes, &.maidens, &.children {text-align: right;}
	&.kp {text-align: right;overflow: initial;}
}
</style>
