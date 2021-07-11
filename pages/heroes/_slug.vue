<template>
	<div>{{ hero.name }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

export default Vue.extend({
	name: 'HeroSlug',
	async asyncData ({ params, $strapi }) {
		const hero = await $strapi.find('heroes', { slug: params.slug })
		return { hero: hero[0] }
	},
	// @ts-ignore
	head (): MetaInfo { return { title: this.hero.name } },
})
</script>
