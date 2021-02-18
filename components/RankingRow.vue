<template>
	<tr
		:class="{'is-selected': parseInt($route.params.id) === player.id}"
		@click="$router.push({name: 'index-id', params: {id: player.id.toString()}})"
	>
		<td>{{ index + 1 }}</td>
		<td class="player">
			<nuxt-link :key="player.id" :to="{name: 'index-id', params: {id: player.id}}">
			{{ player.name }}
			</nuxt-link>
		</td>
		<td class="vip">VIP<span style="font-weight: bold;">{{ player.vip }}</span></td>
		<td v-if="rank.alliance" class="alliance">{{ rank.alliance.name }}</td>
		<td v-else>-</td>
		<td>{{ `${rank.power} (${rank.level})` }}</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player, Ranking } from '~/types/types'

export default Vue.extend({
	name: 'RankingRow',
	props: {
		index: {
			type: Number,
			required: true,
		},
		rank: {
			type: Object as () => Ranking,
			required: true,
		},
	},
	computed: {
		player (): Player { return this.rank.player },
	},
})
</script>

<style scoped>
table td {
	text-align: left;
}
</style>
