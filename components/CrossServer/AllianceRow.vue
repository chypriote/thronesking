<template>
	<tr>
		<td class="">{{ index + 1 }}</td>
		<td class="">{{ alliance.name }}</td>
		<td class="has-text-right">{{ alliance.server }}</td>
		<td class="has-text-right highlight">{{ alliance.power |numeral }}</td>
		<td class="has-text-right">{{ alliance.wins }}</td>
		<td v-if="alliance.battletime" class="has-text-right">{{ format(alliance.battletime, 'dd/MM HH:ii') }}</td>
		<td v-else class="has-text-right">-</td>
		<td>
			<v-select
				id="hero"
				ref="hero"
				v-model="hero"
				:input-id="'hero-input'"
				:options="heroes"
				aria-label="hero"
				required
				label="hero.name"
				:reduce="hero => hero.id"
				placeholder="Send hero"
			>
				<template #selected-option="option">
					<div class="option">
						<span class="name">{{ option.hero.name }} - {{ option.mpower |numeral }}</span>
					</div>
				</template>
				<template #option="option">
					<div class="option">
						<span class="name">{{ option.hero.name }} - {{ option.mpower |numeral }}</span>
					</div>
				</template>
			</v-select>
		</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'date-fns'
import { orderBy } from 'lodash-es'
import { Alliance } from '~/types'
import { AccountHero } from '~/types/account'

export default Vue.extend({
	name: 'AllianceRow',
	props: {
		alliance: {
			type: Object as () => Alliance,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
	},
	data: () => ({ format, hero: null }),
	computed: {
		heroes (): AccountHero[] { return orderBy(this.$store.state.account.heroes.heroes, 'mpower', 'desc') },
	},
})
</script>

<style scoped>
.quality {
	width: 2rem;
	height: 2rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: .25rem;
	background-color: var(--background-color);
	border: 1px solid var(--foreground-color-high-contrast);
	cursor: pointer;
	&.hint--top {font-weight: bold;}
}
</style>
