<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
		<div class="container">
			<div class="navbar-brand">
				<nuxt-link class="item home" to="/">Home</nuxt-link>
			</div>
			<div class="navbar-search">
				<player-select />
			</div>
			<div class="navbar-menu">
				<div class="navbar-end">
					<nuxt-link class="item" to="/players">Players</nuxt-link>
					<div class="item dropdown is-hoverable">
						<div class="dropdown-trigger">Ladders</div>
						<div class="dropdown-menu">
							<div class="dropdown-content" role="menu">
								<nuxt-link class="dropdown-item" to="/ladders/kingdom">Kingdom</nuxt-link>
								<nuxt-link class="dropdown-item" to="/ladders/alliances">Alliances</nuxt-link>
							</div>
						</div>
					</div>
					<div class="item dropdown is-hoverable">
						<div class="dropdown-trigger">Game</div>
						<div class="dropdown-menu">
							<div class="dropdown-content" role="menu">
								<nuxt-link class="dropdown-item" to="/heroes">Heroes</nuxt-link>
								<nuxt-link class="dropdown-item" to="/maidens">Maiden</nuxt-link>
							</div>
						</div>
					</div>
					<div class="item dropdown is-hoverable">
						<div class="dropdown-trigger">Account</div>
						<div class="dropdown-menu">
							<div class="dropdown-content" role="menu">
								<nuxt-link class="dropdown-item" to="/account/roster">Roster</nuxt-link>
								<nuxt-link class="dropdown-item" to="/account/maiden">Maiden</nuxt-link>
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
import PlayerSelect from '~/components/Global/PlayerSelect.vue'

export default Vue.extend({
	name: 'Navbar',
	components: { PlayerSelect },
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
	@media (min-width: 992px) {flex: 1;width: auto;padding: 0 1rem;}
	.v-select {
		width: 100%;
	}
	.option.selected {
		word-break: break-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
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
