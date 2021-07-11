<template>
	<div :id="group.id" class="columns is-multiline">
		<template v-if="heroes.length">
			<div class="column is-full">
				<div class="title is-3 has-text-white">{{ group.name }}</div>
			</div>
			<div v-for="hero of heroes" :key="hero.id" class="column is-half-desktop">
				<hero-card :hero="hero" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { filter, orderBy } from 'lodash-es'
import { Attribute, Hero, HeroGroup } from '~/types/Hero'
import HeroCard from '~/components/Heroes/HeroCard.vue'

export default Vue.extend({
	name: 'HeroGroup',
	components: { HeroCard },
	props: {
		group: {
			type: Object as () => HeroGroup,
			required: true,
		},
		focus: {
			type: String as () => Attribute,
			required: false,
			default: null,
		},
		stars: {
			type: Number,
			required: false,
			default: null,
		},
	},
	computed: {
		heroes (): Hero[] {
			return orderBy(
				filter(this.group.heroes, h => (!this.focus || h.focus === this.focus) && (!this.stars || h.stars === this.stars)),
				'hid',
				'asc'
			)
		},
	},
})
</script>
