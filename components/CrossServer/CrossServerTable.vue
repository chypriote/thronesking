<template>
	<table class="table">
		<thead>
		<tr>
			<th>Rank</th>
			<th class="field" @click="toggleField(Field.NAME)">
				<span class="field-name">Name</span>
				<span v-if="fields.includes(Field.NAME)" class="ordering" :class="`order-${fields.indexOf(Field.NAME)}`">
					{{ orders[fields.indexOf(Field.NAME)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.SERVER)">
				<span class="field-name">Server</span>
				<span v-if="fields.includes(Field.SERVER)" class="ordering" :class="`order-${fields.indexOf(Field.SERVER)}`">
					{{ orders[fields.indexOf(Field.SERVER)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field highlight" @click="toggleField(Field.POWER)">
				<span class="field-name">Power</span>
				<span v-if="fields.includes(Field.POWER)" class="ordering" :class="`order-${fields.indexOf(Field.POWER)}`">
					{{ orders[fields.indexOf(Field.POWER)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field highlight" @click="toggleField(Field.WINS)">
				<span class="field-name">Wins</span>
				<span v-if="fields.includes(Field.WINS)" class="ordering" :class="`order-${fields.indexOf(Field.WINS)}`">
					{{ orders[fields.indexOf(Field.WINS)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field highlight">
				<span class="field-name" @click="toggleField(Field.BATTLETIME)">Battle</span>
				<span v-if="fields.includes(Field.BATTLETIME)" class="ordering" :class="`order-${fields.indexOf(Field.BATTLETIME)}`" @click="toggleField(Field.BATTLETIME)">
					{{ orders[fields.indexOf(Field.BATTLETIME)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
				<label class="checkbox" for="opponent">
					<input id="opponent" v-model="opponent" type="checkbox">
				</label>
			</th>
			<th class="field">Heroes</th>
		</tr>
		</thead>
		<tbody>
		<alliance-row v-for="(alliance, index) of alliances" :key="alliance.id" :alliance="alliance" :index="index" />
		</tbody>
	</table>
</template>

<script lang="ts">
import Vue from 'vue'
import { filter, orderBy } from 'lodash-es'
import AllianceRow from '~/components/CrossServer/AllianceRow.vue'
import { Alliance } from '~/types'
import { Field, Order } from '~/store/cross'

export default Vue.extend({
	name: 'CrossServerTable',
	components: { AllianceRow },
	data: () => ({ Field, Order }),
	computed: {
		opponent: {
			get (): boolean { return this.$store.state.cross.opponent },
			set () { this.$store.commit('cross/TOGGLE_OPPONENTS') },
		},
		orders (): Order[] { return this.$store.state.cross.orders },
		fields (): Field[] { return this.$store.state.cross.fields },
		alliances (): Alliance[] {
			const alliances = orderBy(this.$store.state.cross.alliances, this.fields, this.orders)
			return this.opponent ? filter(alliances, a => a.opponent === true) : alliances
		},
	},
	methods: {
		toggleField (field: Field): void {
			this.$store.commit('cross/TOGGLE_FIELD', field)
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
