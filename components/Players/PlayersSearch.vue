<template>
	<div class="search card">
		<div class="card-content">
			<div class="columns">
				<div class="column">
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
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<fieldset class="field">
						<label for="server">Server</label>
						<div class="select">
							<select id="server" v-model="server" aria-label="Server">
								<option v-for="item of servs" :key="item" :value="item" selected>{{ item }}</option>
							</select>
							<!--					<server-select id="server" :servers="servers" @select="setServers" />-->
						</div>
					</fieldset>
				</div>
				<div class="column">
					<fieldset class="field">
						<label for="alliance">Alliance</label>
						<div class="select">
							<select id="alliance" v-model="alliance" name="alliance">
								<option v-for="item of alliances" :key="item.id" :value="item">{{ item.name }}</option>
							</select>
						</div>
					</fieldset>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash-es'
import { servs } from '~/store'
import { Alliance } from '~/types'
// import ServerSelect from '~/components/Global/ServerSelect.vue'

export default Vue.extend({
	name: 'PlayersSearch',
	// components: { ServerSelect },
	data: () => ({ query: null, servs }),
	computed: {
		// servers () { return this.$store.state.servers },
		server: {
			get (): number { return this.$store.state.server },
			set (server): void { this.$store.dispatch('SET_SERVER', server) },
		},
		alliances (): Alliance[] { return this.$store.state.alliances },
		alliance: {
			get (): number { return this.$store.state.alliance },
			set (alliance): void { this.$store.dispatch('SET_ALLIANCE', alliance) },
		},
	},
	methods: {
		async setServers (servers: number[]): Promise<void> {
			await this.$store.dispatch('SET_SERVER', servers)
		},
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
