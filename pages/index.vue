<template>
	<div>
		<div class="columns is-multiline">
			<div class="column is-full is-one-third-desktop is-offset-one-third-desktop">
				<div class="card bordered">
					<div class="card-content">
						<label>Find a player</label>
						<player-select />
					</div>
				</div>
			</div>
			<div class="column is-full is-one-third-desktop">
				<fieldset class="field">
					<div class="select">
						<label for="server">Select a server</label>
<!--						<server-select id="server" :servers="servers" @select="setServers" />-->
						<select id="server" v-model="server">
							<option value="699" selected>699</option>
							<option value="775">775</option>
							<option value="701">701</option>
						</select>
					</div>
				</fieldset>
			</div>
			<div class="column is-full is-one-third-desktop">
				<top-kingdom />
			</div>
			<div class="column is-full is-one-third-desktop">
				<top-alliance />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import TopKingdom from '~/components/Leaderboards/TopKingdom.vue'
import TopAlliance from '~/components/Leaderboards/TopAlliance.vue'
import PlayerSelect from '~/components/Global/PlayerSelect.vue'
// import ServerSelect from '~/components/Global/ServerSelect.vue'

export default Vue.extend({
	name: 'Index',
	components: { PlayerSelect, TopKingdom, TopAlliance },
	computed: {
		server: {
			get (): number { return this.$store.state.server },
			set (server): void { this.$store.dispatch('SET_SERVER', server) },
		},
		servers () { return this.$store.state.servers },
	},
	methods: {
		async setServers (servers: number[]): Promise<void> {
			await this.$store.dispatch('SET_SERVER', servers)
		},
	},
})
</script>
