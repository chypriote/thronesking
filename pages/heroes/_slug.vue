<template>
	<div class="columns">
		<div class="column is-one-quarter">
			<hero-informations />
			<hero-select />
		</div>
		<div class="column is-three-quarters">
			<div class="columns is-multiline">
				<div class="column is-full">
					<div class="title is-2 has-text-white-bis">Quality Skills</div>
				</div>
				<div v-for="skill of orderedSkills" :key="skill.id" class="column is-one-quarter">
					<hero-skill :skill="skill" />
				</div>
			</div>
			<div v-if="paragons.length" class="columns is-multiline">
				<div class="column is-full">
					<div class="title is-2 has-text-white-bis">Paragon</div>
				</div>
				<div v-for="paragon of paragons" :key="paragon.id" class="column is-half">
					<hero-paragon :paragon="paragon" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { orderBy } from 'lodash-es'
import { Attribute, Hero, QualitySkill } from '~/types/Hero'
import { LeveledParagon, LeveledQualitySkill } from '~/store/game/heroes'
import HeroSkill from '~/components/Heroes/HeroSkill.vue'
import HeroParagon from '~/components/Heroes/HeroParagon.vue'
import HeroInformations from '~/components/Heroes/HeroInformations.vue'
import HeroSelect from '~/components/Calculator/HeroSelect.vue'

export default Vue.extend({
	name: 'HeroSlug',
	components: { HeroSelect, HeroSkill, HeroParagon, HeroInformations },
	async asyncData ({ params, store }) {
		await store.dispatch('game/heroes/LOAD_HERO', params.slug)
	},
	// @ts-ignore
	head (): MetaInfo { return { title: this.hero.name } },
	computed: {
		heroes (): Hero[] { return this.$store.state.available_heroes },
		hero (): Hero { return this.$store.state.game.heroes.hero },
		skills (): LeveledQualitySkill[] { return this.$store.state.game.heroes.skills },
		orderedSkills (): LeveledQualitySkill[] {
			const attributes = Object.values(Attribute)
			return orderBy(this.skills,
				['unlockable', (a: QualitySkill) => attributes.indexOf(a.attribute), 'stars'],
				['desc', 'asc', 'desc']
			)
		},
		paragons (): LeveledParagon[] { return this.$store.state.game.heroes.paragons },
	},
})
</script>
