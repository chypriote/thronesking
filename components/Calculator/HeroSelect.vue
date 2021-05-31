<template>
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
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types/Hero'

export default Vue.extend({
	name: 'HeroSelect',
	data: () => ({
		loading: false,
	}),
	computed: {
		heroes (): Hero[] { return this.$store.state.available_heroes },
		hero: {
			get (): Hero | null { return this.$store.state.calculator.hero },
			set (hero): void { this.$store.dispatch('calculator/LOAD_HERO', hero) },
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
