<template>
	<div class="content">
		<div class="hero-level">
			<div class="control">
				<button class="button" type="button" :disabled="(level - 1) < 1" @click.prevent="lowerLevel">-</button>
			</div>
			<div class="current-level">Level
				<input class="hero-level-input" type="number" autocomplete="off" :value="level" @change="setHeroLevel" />
			</div>
			<div class="control">
				<button class="button" type="button" :disabled="level >= 400" @click.prevent="raiseLevel">+</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types/Hero'

export default Vue.extend({
	name: 'HeroLevel',
	computed: {
		level (): Hero { return this.$store.state.game.heroes.level },
	},
	methods: {
		raiseLevel () { this.$store.commit('game/heroes/RAISE_HERO_LEVEL') },
		lowerLevel () { this.$store.commit('game/heroes/LOWER_HERO_LEVEL') },
		// @ts-ignore
		setHeroLevel ($event: Event) { this.$store.commit('game/heroes/SET_HERO_LEVEL', $event.target.value) },
	},
})
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
}
.hero-level {
	display: flex;
	width: 50%;
	margin-top: 1rem;
	.current-level {
		flex-grow: 1;
		text-align: center;
		display: flex;
		justify-content: center;
		input {
			display: inline-block;
			margin-left: .5rem;
			height: 1.5rem;
			padding: .25rem;
			max-width: 3rem;
		}
	}
	button {padding: .25rem;line-height: 1;}
	.hero-level-input {-moz-appearance: textfield;}
	.hero-level-input::-webkit-outer-spin-button,
	.hero-level-input::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}
}
</style>
