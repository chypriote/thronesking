<template>
	<div class="card bordered">
		<div class="paragon-name">
			<div class="title is-5 is-bold has-text-white">{{ paragon.name }}</div>
			<div class="subtitle is-6 description">
				<p v-if="paragon.military">{{ `${paragon.military * paragon.level}% military` }}</p>
				<p v-if="paragon.fortune">{{ `${paragon.fortune * paragon.level}% fortune` }}</p>
				<p v-if="paragon.provisions">{{ `${paragon.provisions * paragon.level}% provisions` }}</p>
				<p v-if="paragon.inspiration">{{ `${paragon.inspiration * paragon.level}% inspiration` }}</p>
				<p v-if="paragon.description">{{ paragon.description }}</p>
			</div>
		</div>
		<div class="paragon-level">
			<div class="control">
				<button class="button" type="button" :disabled="(paragon.level - 1) < 0" @click.prevent="lowerLevel">-</button>
			</div>
			<div class="current-level">Level
				<input class="paragon-level-input" type="number" autocomplete="off" :value="paragon.level" @change="setSkillLevel" />
			</div>
			<div class="control">
				<button class="button" type="button" :disabled="paragon.level >= paragon.levels" @click.prevent="raiseLevel">+</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LeveledParagon } from '~/store/game/heroes'

export default Vue.extend({
	name: 'HeroParagon',
	props: {
		paragon: {
			type: Object as () => LeveledParagon,
			required: true,
		},
	},
	methods: {
		raiseLevel () { this.$store.commit('game/heroes/RAISE_PARAGON_LEVEL', this.paragon) },
		lowerLevel () { this.$store.commit('game/heroes/LOWER_PARAGON_LEVEL', this.paragon) },
		// @ts-ignore
		setSkillLevel ($event: Event) { this.$store.commit('game/heroes/SET_PARAGON_LEVEL', { ...this.paragon, level: $event.target.value }) },
	},
})
</script>

<style scoped>
.card {
	padding: .5rem .5rem;
	height: 100%;
	position: relative;
	transition: opacity 200ms ease-in-out;
	display: flex;
	flex-direction: column;
	&.locked {
		position: relative;
		opacity: .3;
		cursor: pointer;
		&::before {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			content: 'CLICK TO UNLOCK';
			background-color: rgba(20, 29, 38, .75);
			color: white;
			opacity: 0;
			transition: opacity 200ms ease-in-out;
			z-index: 2;
		}
		&:hover::before {opacity: 1;}
	}
}
.paragon-name {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}
.paragon-level {
	display: flex;
	width: 100%;
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
	.paragon-level-input {-moz-appearance: textfield;}
	.paragon-level-input::-webkit-outer-spin-button,
	.paragon-level-input::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}
}
</style>
