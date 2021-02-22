<template>
	<tr :class="{'is-selected': parseInt($route.params.id) === alliance.id}">
		<td class="rank">
			<div :class="{'ribbon': [0, 1, 2].includes(index), 'placing-1': index === 0, 'placing-2': index===1, 'placing-3': index ===2}">
				<svg v-if="[0, 1, 2].includes(index)" viewBox="0 0 20 13.333" class="icon"><path d="M4.868 13.333H15.13l4.444-8.889h-5.556L11.797 0h-3.6L5.975 4.444H.419zm2.484-6.667l2.222-4.444h.849l2.222 4.444h3.333l-2.222 4.444H6.242L4.02 6.666zM0 0h2.222v2.222H0zM17.778 0H20v2.222h-2.222z"></path></svg>
				{{ index + 1 }}
			</div>
		</td>
		<td class="alliance">
			<nuxt-link :key="alliance.id" :to="{name: 'alliances-id', params: {id: alliance.id}}">
				<span class="name">{{ alliance.name }}</span>
			</nuxt-link>
		</td>
		<td class="stat power highlight">{{ alliance.power }}</td>
		<td class="stat reputation">{{ alliance.reputation }}</td>
		<td class="stat level">{{ alliance.level }}</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance } from '~/types'

export default Vue.extend({
	name: 'AllianceRow',
	props: {
		index: {
			type: Number,
			required: true,
		},
		alliance: {
			type: Object as () => Alliance,
			required: true,
		},
	},
})
</script>

<style scoped>
td {
	&.rank {padding: 0;position: relative;text-align: center;}
	&.alliance {
		width: 100%;
		a {
			display: flex;
			align-items: center;
			&:hover {color: inherit;}
		}
		.name {white-space: nowrap;}
	}
	&.power {text-align: right;}
	&.level {margin-bottom: 0;}
}
</style>
