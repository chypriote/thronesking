<template>
	<div>
		<div class="columns is-multiline">
			<div class="column is-one-third">
				<div class="card">
					<div class="card-content">
						<form @submit.prevent="getRecommendations">
							<fieldset class="field is-grouped">
								<div class="control is-expanded">
									<input
										id="quality"
										v-model="quality"
										class="input"
										aria-label="Quality"
										type="text"
										placeholder="Quality"
										autocomplete="off"
									/>
								</div>
								<div class="control">
									<button type="submit" class="button --primary" :class="{'is-loading': loading}">Find</button>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="columns">
			<main class="column is-two-thirds">
				<scouting-table />
			</main>
			<aside class="column is-one-third">
				<div class="sticky">
					<player-peek />
				</div>
			</aside>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'
import PlayerPeek from '~/components/Global/PlayerPeek.vue'
import ScoutingTable from '~/components/Finder/ScoutingTable.vue'

interface IData {
	quality: null|number
	players: Player[]
	loading: boolean
}
export default Vue.extend({
	name: 'Finder',
	components: { ScoutingTable, PlayerPeek },
	async asyncData ({ store }) {
		await store.dispatch('ladder/RESET')
	},
	data: (): IData => ({ quality: null, players: [], loading: false }),
	methods: {
		async getRecommendations () {
			this.loading = true
			this.players = await this.$store.dispatch('finder/FETCH_RECOMMENDATIONS', this.quality)
			this.loading = false
		},
	},
})
</script>
