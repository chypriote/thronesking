<template>
	<div class="card">
		<div class="card-content">
			<div class="title is-6 has-text-white-ter">Select another hero</div>
			<fieldset id="select-hero" class="field">
				<v-select
					id="hero"
					ref="hero"
					:input-id="'hero-input'"
					:options="heroes"
					aria-label="hero"
					required
					label="name"
					placeholder="Select hero"
					@input="goToHero"
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
				</v-select>
			</fieldset>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types/Hero'

export default Vue.extend({
	name: 'HeroSelect',
	computed: {
		heroes (): Hero[] { return this.$store.state.available_heroes },
	},
	methods: {
		goToHero (hero: Hero|null) {
			if (!hero) { return }
			this.$router.push({ name: 'heroes-slug', params: { slug: hero.slug } })
		},
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
</style>
