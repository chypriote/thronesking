<template>
	<div class="card bordered">
		<header><h3 class="title is-5">Heroes</h3></header>
		<div class="card-content">
			<div class="roster">
				<hero-card v-for="hero of roster" :key="hero.id" class="hero" :hero="hero" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types'
import HeroCard from '~/components/Players/HeroCard.vue'

export default Vue.extend({
	name: 'HeroesCard',
	components: { HeroCard },
	computed: {
		roster (): Hero[] { return this.$store.state.player.roster },
	},
})
</script>

<style scoped>
.roster {
	display: flex;
	flex-wrap: wrap;
	.hero {
		flex: 0 0 15%;
	}
}
</style>
