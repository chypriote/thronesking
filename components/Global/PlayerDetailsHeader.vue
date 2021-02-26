<template>
	<header>
		<div class="player">
			<h2 class="title is-3">
				<span v-if="player.favorite">⭐</span>
				<span v-if="player.inactive">⏱</span>
				{{ player.name }}
			</h2>
			<p class="subtitle">{{ `VIP${player.vip}` }} - {{ player.gid }}</p>
		</div>
		<div v-if="rank" class="rank">{{ rank |ordinal }}</div>
		<nuxt-link :to="{name: 'players-id', params: {id: player.id}}" class="go-to">View</nuxt-link>
	</header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'

export default Vue.extend({
	name: 'PlayerDetailsHeader',
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
		rank: {
			type: Number,
			required: false,
			default: null,
		},
	},
})
</script>

<style scoped>
header {
	display: flex;
	position: relative;
	.player {
		flex-grow: 1;
	}
	.rank {
		font-size: 2rem;
		font-weight: bold;
		color: var(--text-color-primary);
	}
	.title:not(.is-spaced) + .subtitle {margin-top: 0;}
	.go-to {
		position: absolute;
		font-size: .8rem;
		bottom: .5rem;
		right: 1rem;
	}
}
</style>
