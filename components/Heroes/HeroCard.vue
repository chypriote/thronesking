<template>
	<div class="card bordered">
		<div class="card-content">
			<div class="picture">
				<img v-if="hero.picture" :src="hero.picture.formats.small.url" :alt="hero.name" />
			</div>
			<div class="details">
				<div class="title is-3">{{ hero.name }}</div>
				<div class="subtitle is-6"><span v-for="i of hero.stars" :key="`star-${i}`">⭐</span></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types/Hero'

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
.card-content {
	display: flex;
}
.picture {
	width: 5rem;
}
.details {
	display: flex;
	flex-direction: column;
}
</style>
