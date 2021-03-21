<template>
	<form class="add-hero" @submit.prevent="saveHero">
		<fieldset id="select-hero" class="field">
			<v-select
				id="hero"
				ref="hero"
				v-model="hero"
				:input-id="'hero-input'"
				:options="heroes"
				aria-label="hero"
				required
				label="name"
				:reduce="hero => hero.id"
				:disabled="loading"
				placeholder="Add hero"
				@option:selected="selectHero"
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
		<fieldset id="input-quality" class="field">
			<div class="control">
				<div class="field has-addons">
					<div class="control"><button class="button" type="button" :disabled="loading || (quality - 100) < 1" @click.prevent="quality = Math.max(quality - 100, 0)">-100</button></div>
					<div class="control"><button class="button" type="button" :disabled="loading || (quality - 10) < 1" @click.prevent="quality = Math.max(quality - 10, 0)">-10</button></div>
					<div class="control"><button class="button" type="button" style="border-bottom-right-radius: 0;border-top-right-radius: 0;" :disabled="loading || (quality - 1) < 1" @click.prevent="quality = Math.max(quality - 1, 0)">-1</button></div>
				</div>
			</div>
			<div class="control quality">
				<input id="hero-quality" v-model="quality" aria-label="Quality" type="number" class="input control" required placeholder="Quality" :disabled="loading || !hero" />
			</div>
			<div class="control">
				<div class="field has-addons">
					<div class="control"><button class="button" type="button" style="border-bottom-left-radius: 0;border-top-left-radius: 0;" :disabled="loading || !hero" @click.prevent="quality = quality + 1">+1</button></div>
					<div class="control"><button class="button" type="button" :disabled="loading || !hero" @click.prevent="quality = quality + 10">+10</button></div>
					<div class="control"><button class="button" type="button" :disabled="loading || !hero" @click.prevent="quality = quality + 100">+100</button></div>
				</div>
			</div>
		</fieldset>
		<fieldset id="button-submit" class="field">
			<div class="control">
				<button class="button --primary" :class="{'is-loading': saving}" type="submit">Submit</button>
			</div>
		</fieldset>
	</form>
</template>

<script lang="ts">
import Vue from 'vue'
import { find } from 'lodash-es'
import { Hero, Player } from '~/types'

interface IData {
	hero: Hero|null
	quality: number|null
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
		heroes (): Hero[] { return this.available_heroes.filter(h => !find(this.roster, it => it.hero === h.id)) },
	},
	methods: {
		async saveHero () {
			if (this.saving) { return }
			this.saving = true
			const hero = await this.$strapi.create('player-heroes', {
				player: this.player,
				hero: this.hero,
				quality: this.quality,
			})
			this.$store.commit('player/ADD_HERO_TO_ROSTER', { ...hero.hero, base: hero.hero.quality, quality: hero.quality })
			// @ts-ignore
			this.$refs.hero.clearSelection()
			this.quality = null
			this.saving = false
			document.getElementById('hero-input')?.focus()
		},
		async selectHero (hero: Hero) {
			this.quality = hero.quality
			if (!hero) { return (this.quality = null) }
			await setTimeout(() => {}, 500)
			document.getElementById('hero-quality')?.focus()
		},
	},
})
</script>

<style scoped>
.add-hero {
	display: flex;
	align-items: center;
	.field {margin-bottom: 0;}
	.field + .field {margin-left: 1rem;}
	@media (max-width: 768px) {
		flex-direction: column;
		.field {width: 100%;}
		.field + .field {margin-top: 1rem;margin-left: 0;}
		#button-submit {text-align: right;}
	}
	@media (min-width: 1024px) and (max-width: 1216px) {
		flex-direction: column;
		.field {width: 100%;}
		.field + .field {margin-top: 1rem;margin-left: 0;}
		#button-submit {text-align: right;}
	}
}
#select-hero {flex: 1;}
#input-quality {
	display: flex;
	.control {display: flex;}
	.quality {flex: 1;}
	input {border-radius: 0;}
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
