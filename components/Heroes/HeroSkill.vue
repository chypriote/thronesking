<template>
	<div class="card bordered" :class="{'locked': !skill.unlocked}" @click.prevent="unlockSkill">
		<div class="skill-name">
			<img v-if="skill.attribute" :src="require(`~/assets/${skill.attribute}.png`)" :alt="skill.attribute" class="attribute">
			<div class="name">{{ skill.name }}</div>
		</div>
		<div class="stars"><span v-for="i of skill.stars" :key="`star-${i}`">⭐</span></div>
		<div class="skill-level">
			<div class="control">
				<button class="button" type="button" :disabled="(skill.level - 1) < 1" @click.prevent="lowerLevel">-</button>
			</div>
			<div class="current-level">Level
        <input class="skill-level-input" type="number" autocomplete="off" :value="skill.level" @change="setSkillLevel" />
      </div>
			<div class="control">
				<button class="button" type="button" :disabled="skill.level > 349" @click.prevent="raiseLevel">+</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LeveledQualitySkill } from '~/store/game/heroes'

export default Vue.extend({
	name: 'HeroSkill',
	props: {
		skill: {
			type: Object as () => LeveledQualitySkill,
			required: true,
		},
	},
	methods: {
		raiseLevel () { this.$store.commit('game/heroes/RAISE_SKILL_LEVEL', this.skill) },
		lowerLevel () { this.$store.commit('game/heroes/LOWER_SKILL_LEVEL', this.skill) },
		// @ts-ignore
		setSkillLevel ($event: Event) { this.$store.commit('game/heroes/SET_SKILL_LEVEL', { ...this.skill, level: $event.target.value }) },
		unlockSkill () {
			if (!this.skill.unlockable) { return }
			this.$store.commit('game/heroes/UNLOCK_SKILL', this.skill)
		},
	},
})
</script>

<style scoped>
.card {
	padding: .5rem .5rem;
	height: 100%;
	position: relative;
	transition: opacity 200ms ease-in-out;
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
.skill-name {
	display: flex;
	align-items: center;
	.attribute {max-height: 1.5rem;max-width: 1.5rem;margin-right: .5rem;}
	.name {font-size: 1.2rem;}
}
.stars {font-size: .8rem;}
.skill-level {
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
	.skill-level-input {-moz-appearance: textfield;}
	.skill-level-input::-webkit-outer-spin-button,
	.skill-level-input::-webkit-inner-spin-button {-webkit-appearance: none;margin: 0;}
}
</style>
