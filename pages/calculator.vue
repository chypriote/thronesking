<template>
	<div class="columns">
		<div class="column is-one-quarter">
			<div class="card">
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
						:disabled="loading"
						placeholder="Select hero"
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
<!--								<div class="quality">{{ option.quality }}</div>-->
							</div>
						</template>
						<template #spinner>
							<span v-show="loading" class="loader" />
						</template>
					</v-select>
				</fieldset>

				<div v-if="hero">
					<div class="hero-details">
						<img v-if="hero.picture" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" class="picture" />
						<h1>{{ hero.name }}</h1>
						<img :src="require(`~/assets/${hero.focus}.png`)" :alt="hero.focus" class="focus">
						<img v-if="hero.second_focus" :src="require(`~/assets/${hero.second_focus}.png`)" :alt="hero.second_focus" class="focus">
					</div>
				</div>
			</div>
		</div>
		<div v-if="hero" class="column is-three-quarters">
			<div v-for="skill of skills" :key="skill.id" class="card">
				<img v-if="skill.attribute" :src="require(`~/assets/${skill.attribute}.png`)" :alt="skill.attribute" class="focus">
				<div class="title is-3">{{ skill.name }}</div>
				<div class="subtitle is-6"><span v-for="i of skill.stars" :key="`star-${i}`">⭐</span></div>
			</div>
			{{ skills }}
			{{ paragons }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero, Paragon, QualitySkill } from '~/types'

export default Vue.extend({
	name: 'Calculator',
	data: () => ({
		loading: false,
	}),
	computed: {
		hero: {
			get (): Hero|null { return this.$store.state.calculator.hero },
			set (hero): void { this.$store.commit('calculator/SET_HERO', hero) },
		},
		heroes (): Hero[] { return this.$store.state.available_heroes },
		// @ts-ignore
		skills (): QualitySkill[] { return this.hero?.quality_skills.map((qs: any) => qs.quality_skill) || [] },
		// @ts-ignore
		paragons (): Paragon[] { return this.hero?.paragons.map((p: any) => p.paragon) || [] },
	},
})
</script>

<style scoped>
#hero .option {
	display: flex;
	align-items: center;
	min-height: 2rem;
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
.hero-details {
	text-align: center;
}
.focus {
	max-height: 2rem;
	max-width: 2rem;
}
</style>
