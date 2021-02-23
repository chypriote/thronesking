<template>
	<div class="card bordered">
		<header><h4 class="title is-5">Add Hero</h4></header>
		<div class="card-content">
			<form @submit.prevent="saveHero">
				<fieldset class="field">
					<label for="hero" class="label">Hero</label>
					<v-select
						id="hero"
						v-model="hero"
						:input-id="'hero-input'"
						:options="heroes"
						required
						label="name"
						:reduce="hero => hero.id"
						@search="debounceInput"
					>
						<template #selected-option="option">
							<div class="option">
								<img v-if="option.picture" :src="option.picture.formats.thumbnail.url" :alt="option.name" class="picture" />
								<span class="name">{{ option.name }}</span>
							</div>
						</template>
						<template #option="option">
							<div class="option">
								<img v-if="option.picture" :src="option.picture.formats.thumbnail.url" :alt="option.name" class="picture" />
								<span class="name">{{ option.name }}</span>
							</div>
						</template>
						<template #spinner>
							<span v-show="loading" class="loader" />
						</template>
					</v-select>
				</fieldset>
				<fieldset class="field">
					<label for="quality" class="label">Quality</label>
					<input id="quality" v-model="quality" type="number" class="input" required />
				</fieldset>
				<fieldset class="field">
					<div class="control">
						<button class="button --primary" :class="{'is-loading': saving}" type="submit">Submit</button>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce, find } from 'lodash-es'
import { Hero, Player } from '~/types'

interface IData {
	heroes: Hero[]
	hero: Hero|null
	quality: Number|null
	loading: boolean
	saving: boolean
}

export default Vue.extend({
	name: 'AddHeroCard',
	data: (): IData => ({
		heroes: [],
		hero: null,
		quality: null,
		loading: false,
		saving: false,
	}),
	computed: {
		player (): Player { return this.$store.state.player },
	},
	methods: {
		debounceInput: debounce(function (value): any {
			// @ts-ignore
			this.searchHeroes(value)
		}, 400),
		async saveHero () {
			this.saving = true
			const hero = await this.$strapi.create('player-heroes', {
				player: this.player,
				hero: this.hero,
				quality: this.quality,
			})
			this.$store.commit('ADD_HERO_TO_ROSTER', { ...hero.hero, base: hero.hero.quality, quality: hero.quality })
			this.hero = null
			this.quality = null
			this.saving = false
		},
		async searchHeroes (value: string|null) {
			if (!value) { return }
			this.loading = true
			this.heroes = []
			const heroes = await this.$strapi.find('heroes', { name_contains: value })
			this.heroes = heroes.filter(h => !find(this.player.roster, it => it.id === h.id))
			this.loading = false
		},
	},
})
</script>

<style scoped>
.control {
	display: flex;
	justify-content: flex-end;
}
#hero .option {
	display: flex;
	align-items: center;
	.picture {
		height: 2rem;
		border-radius: 50%;
		margin-right: 1rem;
	}
}
</style>
