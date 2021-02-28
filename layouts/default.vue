<template>
	<main id="main">
		<navbar />
		<div class="container">
			<nuxt />
		</div>
	</main>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '~/components/Navbar.vue'

export default Vue.extend({
	name: 'DefaultLayout',
	components: { Navbar },
})
</script>
