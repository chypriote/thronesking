<template>
	<div class="card bordered">
		<header><h3 class="title is-5">Heroes</h3></header>
		<div class="card-content">
			<div class="roster columns is-multiline">
				<div v-for="hero of roster" :key="hero.id" class="column is-one-fifth">
					<hero-card class="hero" :hero="hero" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash-es'
import { Hero } from '~/types'
import HeroCard from '~/components/Players/HeroCard.vue'

export default Vue.extend({
	name: 'HeroesCard',
	components: { HeroCard },
	computed: {
		roster (): Hero[] { return orderBy(this.$store.state.player.roster, 'quality', 'desc') },
	},
})
</script>

<style scoped>
.hero {
	margin-bottom: 1rem;
}
</style>
