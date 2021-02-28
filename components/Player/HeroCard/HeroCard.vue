<template>
	<div class="card bordered">
		<div class="hero">
			<img v-if="hero.picture" class="image" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" />
			<p class="name">{{ hero.name }}</p>
			<div v-show="!editing" class="quality" :class="{'hint--top': boost}" :aria-label="`+${boost}`" @click="toggleEdit">{{ hero.quality }}</div>
		</div>
		<form v-show="editing" class="edit" @submit.prevent="updateHero">
			<fieldset class="field is-grouped has-addons">
				<div class="control is-expanded">
					<div class="field has-addons">
						<div class="control">
							<button class="button" type="button" :disabled="(quality - 1) < 1" @click.prevent="quality = Math.max(quality - 1, 0)">
								<span class="icon is-small">-1</span>
							</button>
						</div>
						<div class="control">
							<input :id="`${hero.id}-${quality}`" v-model="quality" class="input" aria-label="quality" type="text" placeholder="Quality" />
						</div>
						<div class="control">
							<button class="button" type="button" @click.prevent="quality = quality + 1">
								<span class="icon is-small">+1</span>
							</button>
						</div>
					</div>
				</div>
				<div class="control">
					<button type="submit" class="button --primary" :class="{'is-loading': loading}">Save</button>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script lang="ts">
import { clone } from 'lodash-es'
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
	data: () => ({ editing: false, loading: false, quality: 0 }),
	computed: {
		boost (): number { return this.hero.quality - this.hero.base },
	},
	methods: {
		toggleEdit () {
			this.editing = !this.editing
			this.loading = false
			this.quality = clone(this.hero.quality)
		},
		async updateHero () {
			if (!this.hero.id) { return }
			this.loading = true
			await this.$store.dispatch('player/UPDATE_HERO', { hero: this.hero, quality: this.quality })
			this.editing = false
			this.loading = false
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
.card {
	margin-top: 0;
	display: flex;
	flex-direction: column;
}
.edit {
	display: flex;
	align-items: center;
	margin-top: .5rem;
	padding: .5rem 0 1rem;
}
.control {display: flex;}
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
	cursor: pointer;
	&.hint--top {font-weight: bold;}
}
</style>
