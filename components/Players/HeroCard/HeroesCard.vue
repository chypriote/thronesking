<template>
	<div class="card bordered">
		<header>
			<h3 class="title is-5">Heroes</h3>
			<button class="button --primary" :class="{'is-loading': loading}" @click="getHeroes">Refresh</button>
		</header>
		<div class="card-content">
			<div v-if="loading" class="loader-wrapper">
				<div class="loader" />
			</div>
			<template v-else>
			<div class="roster columns is-multiline">
				<div v-for="hero of roster" :key="hero.id" class="column is-one-third">
					<hero-card class="hero" :hero="hero" />
				</div>
			</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash-es'
import { Hero } from '~/types'
import HeroCard from '~/components/Players/HeroCard/HeroCard.vue'

export default Vue.extend({
	name: 'HeroesCard',
	components: { HeroCard },
	data: () => ({ loading: true }),
	computed: {
		roster (): Hero[] { return orderBy(this.$store.state.player.roster, 'quality', 'desc') },
	},
	watch: {
		'$route.params.id' () { this.getHeroes() },
	},
	mounted () {
		this.getHeroes()
	},
	methods: {
		async getHeroes () {
			this.loading = true
			await this.$store.dispatch('player/FETCH_ROSTER')
			this.loading = false
		},
	},
})
</script>

<style scoped>
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
