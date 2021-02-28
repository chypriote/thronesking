<template>
	<tr>
		<td>
			<div class="hero">
				<img v-if="hero.hero.picture" class="image" :src="hero.hero.picture.formats.thumbnail.url" :alt="hero.hero.name" />
				<p class="name">{{ hero.hero.name }}</p>
			</div>
		</td>
		<td>
			<div class="quality" :class="{'hint--top': hero.quality - hero.hero.quality}" :aria-label="`+${hero.quality - hero.hero.quality}`">{{ hero.quality }}</div>
		</td>
		<td class="has-text-right">{{ hero.level }}</td>
		<td class="has-text-right">{{ hero.military |numeral }}</td>
		<td class="has-text-right">{{ hero.fortune |numeral }}</td>
		<td class="has-text-right">{{ hero.provisions |numeral }}</td>
		<td class="has-text-right">{{ hero.inspiration |numeral }}</td>
		<td class="has-text-right">{{ hero.brutality }}</td>
		<td class="has-text-right">{{ hero.ferocity }}</td>
		<td class="has-text-right">{{ hero.xp_quality }}</td>
		<td class="has-text-right">{{ hero.xp_tourney }}</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types'

export default Vue.extend({
	name: 'HeroRow',
	props: {
		hero: {
			type: Object as () => Hero,
			required: true,
		},
	},
})
</script>

<style scoped>
.hero {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 1rem;
	width: 100%;
	.image {max-height: 3rem;}
	.name {
		font-size: 1.5rem;
		padding: 0 1rem;
		line-height: 1;
		margin-bottom: 0;
		flex: 1;
		text-align: left;
	}
}
.quality {
	width: 2rem;
	height: 2rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: .25rem;
	background-color: var(--background-color);
	border: 1px solid var(--foreground-color-high-contrast);
	cursor: pointer;
	&.hint--top {font-weight: bold;}
}
</style>
