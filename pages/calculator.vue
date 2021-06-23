<template>
	<div class="columns">
		<div class="column is-one-quarter">
			<hero-select />
			<hero-card v-if="hero" />
		</div>
		<div v-if="hero" class="column is-three-quarters">
			<div class="columns is-multiline">
				<div v-for="skill of orderedSkills" :key="skill.id" class="column is-one-quarter">
					<hero-skill :skill="skill" />
				</div>
			</div>
			{{ skills }}
			{{ paragons }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash-es'
import { Attribute, Hero, Paragon, QualitySkill } from '~/types/Hero'
import { LeveledQualitySkill } from '~/store/calculator'
import HeroSelect from '~/components/Calculator/HeroSelect.vue'
import HeroCard from '~/components/Calculator/HeroCard.vue'
import HeroSkill from '~/components/Calculator/HeroSkill.vue'

export default Vue.extend({
	name: 'Calculator',
	components: { HeroSkill, HeroSelect, HeroCard },
	computed: {
		heroes (): Hero[] { return this.$store.state.available_heroes },
		hero: {
			get (): Hero|null { return this.$store.state.calculator.hero },
			set (hero): void { this.$store.commit('calculator/SET_HERO', hero) },
		},
		skills (): LeveledQualitySkill[] { return this.$store.state.calculator.skills },
		orderedSkills (): LeveledQualitySkill[] {
			const attributes = Object.values(Attribute)
			return orderBy(this.skills,
				['unlockable', (a: QualitySkill) => attributes.indexOf(a.attribute), 'stars'],
				['desc', 'asc', 'desc']
			)
		},
		// @ts-ignore
		paragons (): Paragon[] { return this.hero?.paragons || [] },
	},
})
</script>

<style scoped>
.focus {
	max-height: 2rem;
	max-width: 2rem;
}
</style>
