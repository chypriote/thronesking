<template>
	<div class="columns">
		<div class="column is-one-third">
			<div class="card bordered">
				<div class="card-content"></div>
			</div>
		</div>
		<div class="column is-two-thirds">
			<hero-card v-for="hero of heroes" :key="hero.id" :hero="hero" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types'
import HeroCard from '~/components/Heroes/HeroCard.vue'

interface IData {
	heroes: Hero[]
}

export default Vue.extend({
	name: 'Heroes',
	components: { HeroCard },
	async asyncData ({ $strapi }) {
		const heroes = await $strapi.find('heroes', { _sort: 'quality:desc' })

		return { heroes }
	},
	data: (): IData => ({ heroes: [] }),
})
</script>
