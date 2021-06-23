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
							<option value="532">532</option>
							<option value="619">619</option>
							<option value="637">637</option>
							<option value="653">653</option>
							<option value="676">676</option>
							<option value="690">690</option>
							<option value="691">691</option>
							<option value="693">693</option>
							<option value="694">694</option>
							<option value="695">695</option>
							<option value="698">698</option>
							<option value="692">692</option>
							<option value="696">696</option>
							<option value="697">697</option>
							<option value="701">701</option>
							<option value="707">707</option>
							<option value="709">709</option>
							<option value="736">736</option>

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
