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
					<template #selected-option="option">
						<div class="option">
							<span class="name">{{ option.name }} - {{ option.gid }}</span>
						</div>
					</template>
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
					<nuxt-link class="item" to="/finder">Finder</nuxt-link>
					<nuxt-link class="item" to="/cross">Cross Server</nuxt-link>
					<div class="item dropdown is-hoverable">
						<div class="dropdown-trigger">Ladders</div>
						<div class="dropdown-menu">
							<div class="dropdown-content" role="menu">
								<nuxt-link class="dropdown-item" to="/ladders/kingdom">Kingdom</nuxt-link>
								<nuxt-link class="dropdown-item" to="/ladders/tourney">Tourney</nuxt-link>
								<nuxt-link class="dropdown-item" to="/ladders/alliances">Alliances</nuxt-link>
							</div>
						</div>
					</div>
					<div class="item dropdown is-hoverable">
						<div class="dropdown-trigger">Account</div>
						<div class="dropdown-menu">
							<div class="dropdown-content" role="menu">
								<nuxt-link class="dropdown-item" to="/roster">Roster</nuxt-link>
								<nuxt-link class="dropdown-item" to="/maiden">Maiden</nuxt-link>
							</div>
						</div>
					</div>
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
	top: 0;
	user-select: none;
	width: 100%;
	min-width: 100%;
	z-index: 100;
	background: var(--main-nav-background-color);
	box-shadow: 0 6px 6px 0 rgba(0, 0, 0, .16);
	height: 3.5rem;
	pointer-events: auto;
	transform: translateZ(0);
}
.container {
	justify-content: space-between;
	padding: 0 .5rem;
	display: flex;
}
.navbar-menu {
	justify-content: flex-end;
	align-items: stretch;
	display: flex;
	background-color: initial;
	box-shadow: none;
	@media (min-width: 992px) {flex: 2;}
	.navbar-end {
		justify-content: flex-end;
		margin-left: auto;
		align-items: stretch;
		display: flex;
	}
}
.navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {
	overflow: initial;
}
.navbar-brand {
	@media (min-width: 992px) {flex: 2;}
}
.navbar-search {
	display: flex;
	align-items: center;
	width: 30%;
	@media (min-width: 992px) {flex: 1;width: auto;}
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
	text-transform: uppercase;
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
	&:hover:not(.dropdown)::before {background-color: hsla(0, 0%, 100%, .2);}
	&.nuxt-link-active:not(.home)::before, &.home.nuxt-link-exact-active::before {background-color: var(--text-color-primary);}
}
.dropdown-content {
	background: var(--main-nav-background-color);
	box-shadow: 0 6px 6px 0 rgba(0, 0, 0, .16);
	.dropdown-item {
		color: inherit;
		transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
		&:hover {background-color: hsla(0, 0%, 100%, .2);color: var(--text-color-primary);}
		&.nuxt-link-active:not(.home) {background-color: hsla(0, 0%, 100%, .2);color: var(--text-color-primary);}
	}
}
</style>
