<template>
	<div class="card bordered hero">
		<img v-if="hero.picture" class="image" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" />
		<p class="name">{{ hero.name }}</p>
		<div class="quality" :class="{'hint--top': boost}" :aria-label="`+${boost}`">{{ hero.quality }}</div>
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
	computed: {
		boost (): number { return this.hero.quality - this.hero.base },
	},
})
</script>

<style scoped>
.hero {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 1rem;
	.image {max-height: 4rem;}
	.name {
		font-size: 1.5rem;
		padding: 0 1rem;
		line-height: 1;
		margin-bottom: 0;
		flex: 1;
		text-align: left;
	}
}
.card {margin-top: 0;}
.quality {
	position: absolute;
	right: -.5rem;
	bottom: -.5rem;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: .25rem;
	background-color: var(--background-color);
	border: 1px solid var(--foreground-color-high-contrast);
	&.hint--top {font-weight: bold;}
}
</style>
