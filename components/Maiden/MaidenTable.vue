<template>
	<table class="table">
		<thead>
		<tr>
			<th style="width: 40%;">Maiden</th>
			<th class="field" @click="toggleField(Field.INTIMACY)">
				<span class="field-name">Intimacy</span>
				<span v-if="fields.includes(Field.INTIMACY)" class="ordering" :class="`order-${fields.indexOf(Field.INTIMACY)}`">
					{{ orders[fields.indexOf(Field.INTIMACY)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.CHARM)">
				<span class="field-name">Charm</span>
				<span v-if="fields.includes(Field.CHARM)" class="ordering" :class="`order-${fields.indexOf(Field.CHARM)}`">
					{{ orders[fields.indexOf(Field.CHARM)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field" @click="toggleField(Field.EXPERIENCE)">
				<span class="field-name">Experience</span>
				<span v-if="fields.includes(Field.EXPERIENCE)" class="ordering" :class="`order-${fields.indexOf(Field.EXPERIENCE)}`">
					{{ orders[fields.indexOf(Field.EXPERIENCE)] === Order.DESC ? '🔻' : '🔺' }}
				</span>
			</th>
			<th class="field">
				<div class="field-name">Bond</div>
			</th>
		</tr>
		</thead>
		<tbody>
		<maiden-row v-for="maiden of maidens" :key="maiden.id" :wife="maiden" />
		</tbody>
	</table>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy } from 'lodash-es'
import { AccountMaiden } from '~/types/account'
import { Field, Order } from '~/store/account/maiden'
import MaidenRow from '~/components/Maiden/MaidenRow.vue'

export default Vue.extend({
	name: 'MaidenTable',
	components: { MaidenRow },
	data: () => ({ Field, Order }),
	computed: {
		orders (): Order[] { return this.$store.state.account.maiden.orders },
		fields (): Field[] { return this.$store.state.account.maiden.fields },
		maidens (): AccountMaiden[] { return orderBy(this.$store.state.account.maiden.maidens, this.fields, this.orders) },
	},
	methods: {
		toggleField (field: Field): void {
			this.$store.commit('account/maidens/TOGGLE_FIELD', field)
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
