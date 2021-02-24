<template>
	<div class="stat">
		<div class="stat-label">{{ label }}</div>
		<div class="stat-value">
			<span v-if="tooltip" :aria-label="tooltip" class="hint--top">{{ value }}</span>
			<nuxt-link v-else-if="link" :to="link">{{ value }}</nuxt-link>
			<span v-else>{{ value }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'PlayerStat',
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: [String, Number],
			required: true,
		},
		tooltip: {
			type: String,
			required: false,
			default: null,
		},
		link: {
			type: Object,
			required: false,
			default: null,
		},
	},
})
</script>

<style scoped>
.stat {
	flex: 1;
	display: flex;
	flex-direction: column;
}
.stat-label {
	font-size: .7rem;
	color: var(--text-color-medium);
	text-transform: uppercase;
	margin-bottom: .25rem;
}
</style>
