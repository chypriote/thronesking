<template>
	<tr>
		<td>{{ index + 1 }}</td>
		<td class="alliance">
			{{ alliance.name }}
		</td>
		<td>{{ alliance.power }}</td>
		<td>{{ alliance.reputation }}</td>
		<td>{{ alliance.level }}</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance } from '~/types/types'

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
table td {
	text-align: left;
}
</style>
