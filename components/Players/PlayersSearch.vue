<template>
	<div class="search card">
		<div class="card-content">
			<fieldset class="field">
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
			</fieldset>
			<fieldset class="field">
				<label for="server">Server</label>
				<div class="select">
					<select id="server" v-model="server" aria-label="Server">
						<option value="699" selected>699</option>
						<option value="775">775</option>
						<option value="701">701</option>
					</select>
				</div>
			</fieldset>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash-es'

export default Vue.extend({
	name: 'PlayersSearch',
	data: () => ({ query: null }),
	computed: {
		server: {
			get (): number { return this.$store.state.server },
			set (server): void { this.$store.dispatch('SET_SERVER', server) },
		},
	},
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
.input::placeholder {
	color: var(--text-color-lighter);
}
</style>
