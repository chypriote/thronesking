<template>
	<tr :class="{'is-selected': parseInt($route.params.id) === player.id}">
		<td class="stat gid">{{ player.gid }}</td>
		<td class="player">
			<nuxt-link :key="player.id" :to="{name: 'players-id', params: {id: player.id}}">
				<span class="name">{{ player.name }}</span>
			</nuxt-link>
		</td>
		<td class="stat heroes">{{ player.heroes }}</td>
		<td class="stat kp highlight">{{ player.power }}</td>
		<td class="stat vip">{{ player.vip }}</td>
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
import { Alliance, Player } from '~/types'

export default Vue.extend({
	name: 'PlayerRow',
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
	},
	computed: {
		alliance (): Alliance|undefined { return this.player.alliance },
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
	&.kp {text-align: right;}
}
</style>
