<template>
	<div class="card">
		<div class="card-content">
			<div class="hero-details">
				<img v-if="hero.picture" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" class="picture" />
				<h1>{{ hero.name }}</h1>
				<div class="focuses">
					<img :src="require(`~/assets/${hero.focus}.png`)" :alt="hero.focus" class="focus">
					<img v-if="hero.second_focus" :src="require(`~/assets/${hero.second_focus}.png`)" :alt="hero.second_focus" class="second">
				</div>
			</div>
			<div class="hero-attributes">
				<div class="quality">{{ quality }}</div>
				<img src="~/assets/military.png" alt="Military" class="attribute">
				<img src="~/assets/fortune.png" alt="Fortune" class="attribute">
				<img src="~/assets/provisions.png" alt="Provisions" class="attribute">
				<img src="~/assets/inspiration.png" alt="Inspiration" class="attribute">
			</div>
		</div>
		<div class="card-footer">
			<button class="card-footer-item" @click.prevent="setMax">Max</button>
			<button class="card-footer-item" @click.prevent="reset">Reset</button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types/Hero'

export default Vue.extend({
	name: 'HeroCard',
	computed: {
		hero: {
			get (): Hero | null { return this.$store.state.calculator.hero },
			set (hero): void { this.$store.commit('calculator/SET_HERO', hero) },
		},
		quality (): number { return this.$store.getters['calculator/quality'] },
	},
	methods: {
		setMax () { this.$store.commit('calculator/SET_ALL_SKILLS_LEVEL', 350) },
		reset () { this.$store.dispatch('calculator/RESET_ALL_SKILLS') },
	},
})
</script>

<style scoped>
h1 {font-size: 2rem;}
.hero-details {
	text-align: center;
	position: relative;
	.focuses {
		position: absolute;
		top: 0;
		left: .5rem;
		.focus {
			max-height: 2rem;
			max-width: 2rem;
		}
		.second {
			position: absolute;
			top: .75rem;
			right: -1rem;
			max-height: 1.5rem;
			max-width: 1.5rem;
		}
	}
}
.hero-attributes {
	display: flex;
	flex-direction: column;
	padding: .5rem;
	.attribute {max-height: 1.5rem;max-width: 1.5rem;margin-bottom: 1rem;}
}
</style>
