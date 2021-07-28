<template>
	<div class="columns">
		<div class="column is-three-quarters-desktop">
			<hero-group
				v-for="group of groups"
				:key="group.id"
				:group="group"
				:focus="focus"
				:stars="stars"
			/>
		</div>
		<div class="column is-one-quarter-desktop">
			<div class="sticky">
				<div class="card bordered">
					<div class="card-content menu">
						<a v-for="group of groups" :key="group.id" :href="`#${slugify(group.name.toLowerCase())}`">{{ group.name }}</a>
					</div>
				</div>
				<div class="card bordered">
					<div class="card-content">
						<v-select
							id="focus"
							ref="focus"
							v-model="focus"
							:options="focuses"
							:reduce="focus => focus.value"
							aria-label="focus"
							placeholder="Filter by focus"
						>
							<template #selected-option="option">
								<div class="option">
									<img :src="require(`~/assets/${option.value}.png`)" :alt="option.label" class="picture" />
									<span class="name">{{ option.label }}</span>
								</div>
							</template>
							<template #option="option">
								<div class="option">
									<img :src="require(`~/assets/${option.value}.png`)" :alt="option.label" class="picture" />
									<span class="name">{{ option.label }}</span>
								</div>
							</template>
						</v-select>
						<v-select id="stars" v-model="stars" placeholder="Minimum stars" :options="starsList" :reduce="star => star.value" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import slugify from 'slugify'
import { MetaInfo } from 'vue-meta'
import HeroGroup from '~/components/Heroes/HeroGroup.vue'

interface IData {
	focuses: {value: string, label: string}[]
	focus: {value: string, label: string}|null
	starsList: {value: number, label: string}[]
	stars: {value: string, label: string}|null
	slugify: (string: string, options?: any) => string
}

export default Vue.extend({
	name: 'Heroes',
	components: { HeroGroup },
	async asyncData ({ $strapi }) {
		const groups = await $strapi.find('hero-groups', { _sort: 'order:asc' })

		return { groups }
	},
	data: (): IData => ({
		slugify,
		focuses: [
			{ value: 'balanced', label: 'Balanced' },
			{ value: 'military', label: 'Military' },
			{ value: 'fortune', label: 'Fortune' },
			{ value: 'provisions', label: 'Provisions' },
			{ value: 'inspiration', label: 'Inspiration' },
		],
		focus: null,
		starsList: [
			{ value: 6, label: '⭐⭐⭐⭐⭐⭐' },
			{ value: 5, label: '⭐⭐⭐⭐⭐' },
			{ value: 4, label: '⭐⭐⭐⭐' },
			{ value: 3, label: '⭐⭐⭐' },
			{ value: 2, label: '⭐⭐' },
			{ value: 1, label: '⭐' },
		],
		stars: null,
	}),
	head: (): MetaInfo => ({ title: 'Heroes' }),
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 2rem;
}
.menu {
	display: flex;
	flex-direction: column;
}
#focus .option {
	display: flex;
	align-items: center;
	min-height: 2rem;
	.name {flex: 1;}
	.picture {
		max-width: 1.5rem;
		border-radius: 50%;
		margin-right: 1rem;
	}
}
</style>
