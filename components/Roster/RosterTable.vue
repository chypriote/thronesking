<template>
	<table class="table">
		<thead>
		<tr>
			<th rowspan="2">Hero</th>
			<th class="field" rowspan="2" @click="toggleField(Field.QUALITY)">
				<span class="field-name">Quality</span>
				<span v-if="fields.includes(Field.QUALITY)" class="ordering" :class="`order-${fields.indexOf(Field.QUALITY)}`">
					{{ orders[fields.indexOf(Field.QUALITY)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th colspan="5">Statistics</th>
			<th colspan="2">Tourney</th>
			<th colspan="2">Experience</th>
		</tr>
		<tr>
			<th class="field" @click="toggleField(Field.LEVEL)">
				<span class="field-name">Level</span>
				<span v-if="fields.includes(Field.LEVEL)" class="ordering" :class="`order-${fields.indexOf(Field.LEVEL)}`">
					{{ orders[fields.indexOf(Field.LEVEL)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.MILITARY)">
				<span class="field-name">Military</span>
				<span v-if="fields.includes(Field.MILITARY)" class="ordering" :class="`order-${fields.indexOf(Field.MILITARY)}`">
					{{ orders[fields.indexOf(Field.MILITARY)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.FORTUNE)">
				<span class="field-name">Fortune</span>
				<span v-if="fields.includes(Field.FORTUNE)" class="ordering" :class="`order-${fields.indexOf(Field.FORTUNE)}`">
					{{ orders[fields.indexOf(Field.FORTUNE)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.PROVISIONS)">
				<span class="field-name">Provisions</span>
				<span v-if="fields.includes(Field.PROVISIONS)" class="ordering" :class="`order-${fields.indexOf(Field.PROVISIONS)}`">
					{{ orders[fields.indexOf(Field.PROVISIONS)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.INSPIRATION)">
				<span class="field-name">Inspiration</span>
				<span v-if="fields.includes(Field.INSPIRATION)" class="ordering" :class="`order-${fields.indexOf(Field.INSPIRATION)}`">
					{{ orders[fields.indexOf(Field.INSPIRATION)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.BRUTALITY)">
				<span class="field-name">Brutality</span>
				<span v-if="fields.includes(Field.BRUTALITY)" class="ordering" :class="`order-${fields.indexOf(Field.BRUTALITY)}`">
					{{ orders[fields.indexOf(Field.BRUTALITY)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.FEROCITY)">
				<span class="field-name">Ferocity</span>
				<span v-if="fields.includes(Field.FEROCITY)" class="ordering" :class="`order-${fields.indexOf(Field.FEROCITY)}`">
					{{ orders[fields.indexOf(Field.FEROCITY)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.XP_QUALITY)">
				<span class="field-name">Quality</span>
				<span v-if="fields.includes(Field.XP_QUALITY)" class="ordering" :class="`order-${fields.indexOf(Field.XP_QUALITY)}`">
					{{ orders[fields.indexOf(Field.XP_QUALITY)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.XP_TOURNEY)">
				<span class="field-name">Tourney</span>
				<span v-if="fields.includes(Field.XP_TOURNEY)" class="ordering" :class="`order-${fields.indexOf(Field.XP_TOURNEY)}`">
					{{ orders[fields.indexOf(Field.XP_TOURNEY)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
		</tr>
		</thead>
		<tbody>
		<hero-row v-for="hero of roster" :key="hero.id" :hero="hero" />
		</tbody>
	</table>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash-es'
import { OwnedHero } from '~/types'
import { Field, Order } from '~/store/roster'
import HeroRow from '~/components/Roster/HeroRow.vue'

export default Vue.extend({
	name: 'RosterTable',
	components: { HeroRow },
	data: () => ({ Field, Order }),
	computed: {
		orders (): Order[] { return this.$store.state.roster.orders },
		fields (): Field[] { return this.$store.state.roster.fields },
		roster (): OwnedHero[] { return orderBy(this.$store.state.roster.heroes, this.fields, this.orders) },
	},
	methods: {
		toggleField (field: Field): void {
			this.$store.commit('roster/TOGGLE_FIELD', field)
		},
	},
})
</script>

<style scoped>
th {vertical-align: middle;}
th:not(:last-of-type) {border-right: 1px solid var(--foreground-color);}
th[colspan] {border-bottom: 0;}
.field {
	position: relative;
	.ordering {
		font-size: .8rem;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		&.order-1 {color: red;}
		&.order-2 {color: indianred;}
		&.order-3 {color: palevioletred;}
	}
}
</style>
