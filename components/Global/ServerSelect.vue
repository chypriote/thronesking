<template>
	<v-select
		id="server"
		v-model="loading"
		:input-id="'server-search'"
		:options="available"
		required
		multiple
		@input="selectServer"
	>
		<template #open-indicator />
	</v-select>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
	available: number[]
	loading: boolean
}

export default Vue.extend({
	name: 'ServerSearch',
	props: {
		servers: {
			type: Array,
			required: true,
		},
	},
	data: (): IData => ({
		available: [691, 692, 693, 694, 695, 696, 697, 698, 699],
		loading: false,
	}),
	methods: {
		selectServer (servers: number[]) {
			this.$emit('select', servers)
		},
	},
})
</script>

<style scoped>
.v-select {
	width: 100%;
}
.option.selected {
	word-break: break-all;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
}
</style>
