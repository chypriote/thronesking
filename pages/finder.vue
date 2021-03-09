<template>
	<div>
		<div class="columns is-multiline">
			<div class="column is-one-third">
				<div class="card">
					<div class="card-content">
						<form @submit.prevent="getRecommendations">
							<div class="columns is-multiline">
								<div class="column is-full">
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
								</div>
								<div class="column">
									<fieldset class="field">
										<label class="checkbox" for="scout">
											<input id="scout" v-model="allow_not_scouted" type="checkbox"> 🔍 Only Scouted
										</label>
										<label class="checkbox" for="inactive">
											<input id="inactive" v-model="only_inactive" type="checkbox"> ⏱ Inactive
										</label>
									</fieldset>
								</div>
							</div>
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
import { MetaInfo } from 'vue-meta'
import { Player } from '~/types'
import PlayerPeek from '~/components/Global/PlayerPeek.vue'
import ScoutingTable from '~/components/Finder/ScoutingTable.vue'

interface IData {
	quality: null|number
	players: Player[]
	loading: boolean
	allow_not_scouted: boolean
	only_inactive: boolean
}
export default Vue.extend({
	name: 'Finder',
	components: { ScoutingTable, PlayerPeek },
	async asyncData ({ store }) {
		await store.dispatch('ladder/RESET')
	},
	data: (): IData => ({
		quality: null,
		players: [],
		loading: false,
		allow_not_scouted: false,
		only_inactive: false,
	}),
	head: (): MetaInfo => ({ title: 'Finder' }),
	methods: {
		async getRecommendations () {
			this.loading = true
			const params: any = { }

			if (!this.allow_not_scouted) { params.player_heroes_null = false }
			if (this.only_inactive) { params.inactive = 1 }

			this.players = await this.$store.dispatch('finder/FETCH_RECOMMENDATIONS', { quality: this.quality, params })
			this.loading = false
		},
	},
})
</script>
