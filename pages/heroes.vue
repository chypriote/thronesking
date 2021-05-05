<template>
	<div class="columns is-multiline">
		<div v-for="hero of heroes" :key="hero.id" class="column is-one-third">
			<hero-card :hero="hero" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { Hero } from '~/types'
import HeroCard from '~/components/Heroes/HeroCard.vue'

interface IData {
	heroes: Hero[]
}

export default Vue.extend({
	name: 'Heroes',
	components: { HeroCard },
	async asyncData ({ $strapi }) {
		const heroes = await $strapi.find('heroes', { _sort: 'stars:desc,name:asc' })

		return { heroes }
	},
	data: (): IData => ({ heroes: [] }),
	head: (): MetaInfo => ({ title: 'Heroes' }),
})
</script>
