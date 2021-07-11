<template>
	<div class="card bordered">
		<div class="card-content">
			<div class="hero-id">{{ `#${hero.hid}` }}</div>
			<img v-if="hero.picture" :src="hero.picture.formats.small.url" :alt="hero.name" class="hero-picture" />
			<div class="details">
				<nuxt-link :to="{name: 'heroes-slug', params: {slug: hero.slug}}" class="title is-5">{{ hero.name }}</nuxt-link>
				<div class="stars-focuses">
					<div class="focuses">
						<div class="focus hint--top" :aria-label="hero.focus">
							<img :src="require(`~/assets/${hero.focus}.png`)" :alt="hero.focus">
						</div>
						<div class="second hint--top" :aria-label="hero.focus">
							<img v-if="hero.second_focus" :src="require(`~/assets/${hero.second_focus}.png`)" :alt="hero.second_focus">
						</div>
					</div>
					<div class="stars"><span v-for="i of hero.stars" :key="`star-${i}`">⭐</span></div>
				</div>
				<div class="quality">{{ `${hero.quality}q` }}</div>
				<div v-if="hero.skins.length" class="skins">{{ `${hero.skins.length} skin${hero.skins.length > 1 ? 's' : ''}` }}</div>
			</div>
			<div v-if="maiden && maiden.picture" class="maiden-picture hint--top" :aria-label="maiden.name">
				<nuxt-link :to="{name: 'maidens-slug', params: { slug: maiden.slug }}">
					<img :src="maiden.picture.formats.small.url" :alt="maiden.name" />
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero, Maiden } from '~/types/Hero'

export default Vue.extend({
	name: 'HeroCard',
	props: {
		hero: {
			type: Object as () => Hero,
			required: true,
		},
	},
	computed: {
		maiden (): Maiden|null { return this.hero.maiden },
	},
})
</script>

<style scoped>
.card-content {
	display: flex;
	position: relative;
	padding: .5rem;
}
.hero-id {
	position: absolute;
	top: .125rem;
	left: .25rem;
	font-size: .75rem;
	color: var(--text-color-muted);
}
.hero-picture {
	max-width: 6rem;
	max-height: 6rem;
}
.maiden-picture img {
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
	.stars-focuses {
		display: flex;
		align-items: center;
	}
	.focuses {
		display: flex;
		align-items: center;
		margin-right: .25rem;
		.focus {max-height: 1.25rem;max-width: 1.25rem;}
		.second {max-height: 1rem;max-width: 1rem;}
	}
}
</style>
