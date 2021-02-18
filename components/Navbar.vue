<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
		<div class="container">
			<div class="navbar-brand">
				<nuxt-link class="navbar-item" to="/">Home</nuxt-link>
			</div>
			<div class="navbar-menu">
				<div class="navbar-start">
					<nuxt-link class="navbar-item" to="/players">Players</nuxt-link>
					<nuxt-link class="navbar-item" to="/alliances">Alliances</nuxt-link>
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
	background-color: #fff;
	box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .25);
	display: flex;
	justify-content: center;
}
.container {
	justify-content: space-between;
	padding: 0 .5rem;
}
.navbar-menu {flex: initial;}
.navbar-brand {flex: 1;}
</style>
