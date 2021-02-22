<template>
	<div class="card bordered">
		<div class="image">
			<img v-if="hero.picture" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" />
		</div>
		{{ hero.name }}
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
.card {
	padding: .5rem;
}
</style>
