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
								<div class="quality">{{ option.quality }}</div>
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
import { find } from 'lodash-es'
import { Hero, Player } from '~/types'

interface IData {
	hero: Hero|null
	quality: Number|null
	loading: boolean
	saving: boolean
}

export default Vue.extend({
	name: 'AddHeroCard',
	data: (): IData => ({
		hero: null,
		quality: null,
		loading: false,
		saving: false,
	}),
	computed: {
		player (): Player { return this.$store.state.player.player },
		roster (): Hero[] { return this.$store.state.player.roster },
		available_heroes (): Hero[] { return this.$store.state.available_heroes },
		heroes (): Hero[] { return this.available_heroes.filter(h => !find(this.roster, it => it.id === h.id)) },
	},
	methods: {
		async saveHero () {
			this.saving = true
			const hero = await this.$strapi.create('player-heroes', {
				player: this.player,
				hero: this.hero,
				quality: this.quality,
			})
			this.$store.commit('player/ADD_HERO_TO_ROSTER', { ...hero.hero, base: hero.hero.quality, quality: hero.quality })
			this.hero = null
			this.quality = null
			this.saving = false
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
	.name {
		flex: 1;
	}
	.quality {
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .75rem;
		line-height: 1;
		background-color: transparent;
		border: 1px solid var(--foreground-color-high-contrast);
		border-radius: 50%;
	}
}
</style>
