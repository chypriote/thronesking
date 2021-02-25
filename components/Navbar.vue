<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
		<div class="container">
			<div class="navbar-brand">
				<nuxt-link class="item home" to="/">Home</nuxt-link>
			</div>
			<div class="navbar-search">
				<v-select
					id="player"
					v-model="player"
					:input-id="'player-search'"
					:options="players"
					required
					label="name"
					:reduce="player => player.id"
					@search="debounceInput"
					@input="goToPlayer"
				>
					<template #option="option">
						<div class="option">
							<span class="name">{{ option.name }} - {{ option.gid }}</span>
						</div>
					</template>
					<template #spinner>
						<span v-show="loading" class="loader" />
					</template>
				</v-select>
			</div>
			<div class="navbar-menu">
				<div class="navbar-end">
					<nuxt-link class="item" to="/players">Players</nuxt-link>
					<nuxt-link class="item" to="/kingdom">Kingdom</nuxt-link>
					<nuxt-link class="item" to="/tourney">Tourney</nuxt-link>
					<nuxt-link class="item" to="/alliances">Alliances</nuxt-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash-es'
import { Player } from '~/types'

interface IData {
	players: Player[]
	player: Player|null
	loading: boolean
}

export default Vue.extend({
	name: 'Navbar',
	data: (): IData => ({
		players: [],
		player: null,
		loading: false,
	}),
	methods: {
		debounceInput: debounce(function (value): any {
			// @ts-ignore
			this.searchPlayers(value)
		}, 400),
		async searchPlayers (value: string|null) {
			if (!value) { return }
			this.loading = true
			this.players = []
			this.players = await this.$strapi.find('players', { name_contains: value })
			this.loading = false
		},
		goToPlayer (id: number|null) {
			if (!id) { return }
			this.$router.push({ name: 'players-id', params: { id: id.toString() } })
		},
	},
})
</script>

<style scoped>
.navbar {
	background: var(--main-nav-background-color);
	transform: translateZ(0);
	top: 0;
	user-select: none;
	width: 100%;
	min-width: 100%;
	z-index: 100;
	box-shadow: 0 6px 6px 0 rgba(0, 0, 0, .16);
	height: 3.5rem;
	pointer-events: auto;
}
.container {
	justify-content: space-between;
	padding: 0 .5rem;
}
.navbar-menu {flex: 2;justify-content: flex-end;}
.navbar-brand {flex: 2;}
.navbar-search {
	flex: 1;
	display: flex;
	align-items: center;
	.v-select {
		width: 100%;
	}
}
.item {
	display: flex;
	align-items: center;
	color: var(--text-color-lighter);
	padding: .5rem .75rem;
	position: relative;
	cursor: pointer;
	line-height: 0;
	min-width: 0;
	font-size: 1rem;
	white-space: nowrap;
	font-weight: bold;
	&::before {
		border-radius: .125rem .125rem 0 0;
		content: "";
		height: .25rem;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		transition: height .1s ease-in-out;
	}
	&:hover::before {background-color: hsla(0, 0%, 100%, .2);}
	&.nuxt-link-active:not(.home)::before, &.home.nuxt-link-exact-active::before {background-color: var(--text-color-primary);}
}
</style>
