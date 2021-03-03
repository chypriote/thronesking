<template>
	<div class="card bordered">
		<header>
			<h3 class="title is-5">Heroes</h3>
			<div class="scouted is-flex is-flex-direction-column">
				<span class="title is-6 is-spaced">🔍 {{ roster.length / player.heroes * 100 |percent }} Scouted </span>
				<span class="subtitle has-text-right is-size-6">{{ roster.length }}/{{ player.heroes }}</span>
			</div>
		</header>
		<div class="card-content">
			<add-hero-card id="add-hero-card" />
			<div class="roster columns is-multiline">
				<div v-for="hero of roster" :key="hero.id" class="column is-one-third-fullhd is-half">
					<hero-card class="hero" :hero="hero" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash-es'
import { Hero, Player } from '~/types'
import HeroCard from '~/components/Player/HeroCard/HeroCard.vue'
import AddHeroCard from '~/components/Player/AddHeroCard.vue'

export default Vue.extend({
	name: 'HeroesCard',
	components: { AddHeroCard, HeroCard },
	computed: {
		roster (): Hero[] { return orderBy(this.$store.state.player.roster, 'quality', 'desc') },
		player (): Player { return this.$store.state.player.player },
	},
})
</script>

<style scoped>
#add-hero-card {
	margin-bottom: 2rem;
}
.loader-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 8rem;
	width: 100%;
}
.loader {
	height: 5rem;
	width: 5rem;
}
header {
	display: flex;
	justify-content: space-between;
}
.hero {
	margin-bottom: 1rem;
}
</style>
