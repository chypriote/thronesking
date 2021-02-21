<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
		<div class="container">
			<div class="navbar-brand">
				<nuxt-link class="item" to="/">Home</nuxt-link>
			</div>
			<div class="navbar-menu">
				<div class="navbar-start">
					<nuxt-link class="item" to="/players">Players</nuxt-link>
					<nuxt-link class="item" to="/alliances">Alliances</nuxt-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Navbar',
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
.navbar-menu {flex: initial;}
.navbar-brand {flex: 1;}
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
	&.nuxt-link-active::before {background-color: var(--text-color-primary);}
}
</style>
