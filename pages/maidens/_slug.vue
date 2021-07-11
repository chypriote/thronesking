<template>
	<div class="columns is-multiline">
		<div class="column is-one-third">
			<template v-if="!selected">
				<img v-if="maiden.picture" v-show="!naughty" :src="maiden.picture.formats.medium.url" :alt="maiden.name" />
				<img v-if="maiden.naughty_picture" v-show="naughty" :src="maiden.naughty_picture.formats.medium.url" :alt="maiden.name" />
			</template>
			<template v-for="skin of skins">
				<template v-if="selected === skin.id">
					<img v-if="skin.picture" v-show="!naughty" :key="`naive-${skin.id}`" :src="skin.picture.formats.medium.url" :alt="skin.name" />
					<img v-if="skin.naughty_picture" v-show="naughty" :key="`naughty-${skin.id}`" :src="skin.naughty_picture.formats.medium.url" :alt="skin.name" />
				</template>
			</template>
			<div class="actions">
				<button class="button --primary" type="button" @click="naughty = !naughty">{{ naughty ? 'Naive' : 'Naughty' }}</button>
				<div class="spacer" />
				<button v-if="selected" class="button" type="button" @click="selected = 0">{{ 'Classic' }}</button>
				<button v-for="skin of skins" v-if="selected !== skin.id" :key="skin.id" class="button" type="button" @click="selected = skin.id">{{ skin.name }}</button>
			</div>
		</div>
		<div class="column is-two-thirds">
			<div class="title is-1 has-text-white">{{ maiden.name }}</div>
			<div class="subtitle">{{ `Naughty with ${maiden.naughty} intimacy` }}</div>
			<div class="columns is-multiline">

				<div class="column is-one-third">
					<template v-if="hero">
						<div class="title is-4 has-text-white-bis">Bond</div>
						<nuxt-link :to="{name: 'heroes-slug', params: {slug: hero.slug}}" class="bond">
							<img v-if="hero.picture" :src="hero.picture.formats.small.url" :alt="hero.name" />
							<p>{{ hero.name }}</p>
						</nuxt-link>
					</template>
				</div>

				<div class="column is-two-thirds">
					<template v-if="skins.length">
						<div class="title is-4 has-text-white-bis">Skins</div>
						<div v-for="skin of skins" :key="skin.id" class="skin">
							<img v-if="skin.picture" :src="skin.picture.formats.small.url" :alt="skin.name" />
							<p>{{ skin.name }}</p>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { Hero, Skin } from '~/types/Hero'

export default Vue.extend({
	name: 'MaidenSlug',
	async asyncData ({ params, $strapi }) {
		const maiden = await $strapi.find('maidens', { slug: params.slug })
		return { maiden: maiden[0] }
	},
	data: () => ({ naughty: false, selected: 0 }),
	// @ts-ignore
	head (): MetaInfo { return { title: this.maiden.name } },
	computed: {
		// @ts-ignore
		hero (): Hero|null { return this.maiden.hero },
		// @ts-ignore
		skins (): Skin[] { return this.maiden.skins },
	},
})
</script>

<style scoped>
.title {margin-bottom: 1rem;}
.bond, .skin {
	display: inline-flex;
	align-items: center;
	flex-direction: column;
	img {max-height: 10rem;max-width: 10rem;margin-bottom: .5rem;}
}
.actions {
	display: flex;
	.spacer {flex-grow: 1;}
}
</style>
