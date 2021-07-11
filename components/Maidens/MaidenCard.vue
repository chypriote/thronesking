<template>
	<div class="card">
		<div class="card-content">
			<div v-if="maiden.mid" class="maiden-id">{{ `#${maiden.mid}` }}</div>
			<img v-if="maiden.picture" :src="maiden.picture.formats.small.url" :alt="maiden.name" class="maiden-picture" />
			<div class="details">
				<nuxt-link :to="{name: 'maidens-slug', params: {slug: maiden.slug}}" class="title is-5">{{ maiden.name }}</nuxt-link>
			</div>
			<div v-if="hero && hero.picture" class="hero-picture hint--top" :aria-label="hero.name">
				<nuxt-link :to="{name: 'heroes-slug', params: { slug: hero.slug }}">
					<img :src="hero.picture.formats.small.url" :alt="hero.name" />
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero, Maiden } from '~/types/Hero'

export default Vue.extend({
	name: 'MaidenCard',
	props: {
		maiden: {
			type: Object as () => Maiden,
			required: true,
		},
	},
	computed: {
		hero (): Hero|null { return this.maiden.hero },
	},
})
</script>

<style scoped>
.card-content {
	display: flex;
	position: relative;
}
.maiden-id {
	position: absolute;
	top: .125rem;
	left: .25rem;
	font-size: .75rem;
	color: var(--text-color-muted);
}
.maiden-picture {
	max-width: 6rem;
	max-height: 6rem;
}
.hero-picture img {
	max-width: 5rem;
	max-height: 5rem;
}
.details {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	padding: 0 1rem;
	.title {
		margin-bottom: .25rem;
		color: #fff;
		&:hover {color: var(--text-color-primary);}
	}
}
</style>
