<template>
	<div class="card bordered">
		<div class="image">
			<img v-if="hero.picture" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" />
		</div>
		<div class="card-content">
			<p class="name">{{ hero.name }}</p>
		</div>
		<div class="quality">{{ hero.quality }}</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types'

export default Vue.extend({
	name: 'HeroCard',
	props: {
		hero: {
			type: Object as () => Hero,
			required: true,
		},
	},
})
</script>

<style scoped>
.card {margin-top: 0;}
.card-content {
	border-top: 1px solid inherit;
	padding: .25rem .5rem 1.5rem;
	text-align: center;
}
.quality {
	position: absolute;
	right: -.5rem;
	bottom: -.5rem;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--background-color);
	border: 1px solid var(--foreground-color-high-contrast);
	padding: .25rem;
}
</style>
