<template>
	<div class="content">
		<div class="columns">
			<div class="column is-one-quarter">
				<div class="card bordered">
					<player-details-header :player="player" />
					<div class="card-content">
						<player-stats :player="player" />
					</div>
				</div>
				<notes-card />
				<add-hero-card />
			</div>
			<div class="column is-three-quarters">
				<heroes-card />
				<ranks-card />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'
import PlayerStats from '~/components/PlayerStats.vue'
import PlayerDetailsHeader from '~/components/Players/PlayerDetailsHeader.vue'
import HeroesCard from '~/components/Players/HeroesCard.vue'
import NotesCard from '~/components/Players/NotesCard.vue'
import RanksCard from '~/components/Players/RanksCard.vue'
import AddHeroCard from '~/components/Players/AddHeroCard.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { AddHeroCard, RanksCard, HeroesCard, PlayerStats, PlayerDetailsHeader, NotesCard },
	async asyncData ({ store, route }): Promise<void> {
		await Promise.all([
			store.dispatch('FETCH_PLAYER', route.params.id),
			store.dispatch('ladder/tourney/FETCH_PLAYER_RANKINGS', route.params.id),
			store.dispatch('ladder/kingdom/FETCH_PLAYER_RANKINGS', route.params.id),
		])
	},
	computed: {
		player (): Player { return this.$store.state.player },
	},
})
</script>
