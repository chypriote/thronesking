<template>
	<div class="search card">
		<div class="card-content">
			<input
				id="search"
				v-model="query"
				aria-label="search"
				type="text"
				class="input"
				placeholder="Search"
				autocomplete="off"
				@input="debounceInput"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash-es'

export default Vue.extend({
	name: 'PlayersSearch',
	data: () => ({ query: null }),
	methods: {
		debounceInput: debounce(function (): any {
			// @ts-ignore
			this.search()
		}, 400),
		async search (): Promise<void> {
			if (!this.query) { return await this.$store.dispatch('FETCH_PLAYERS') }
			await this.$store.dispatch('FETCH_PLAYERS', { name_contains: this.query })
		},
	},
})
</script>

<style scoped>
.search {
	margin-bottom: 2rem;
	position: sticky;
	max-width: 30%;
	top: 5rem;
	z-index: 2;
}
.input::placeholder {
	color: var(--text-color-lighter);
}
</style>
