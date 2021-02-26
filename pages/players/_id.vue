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
				<toggle-favorite :player="player" />
				<notes-card />
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
import PlayerStats from '~/components/Global/PlayerStats.vue'
import PlayerDetailsHeader from '~/components/Global/PlayerDetailsHeader.vue'
import HeroesCard from '~/components/Player/HeroCard/HeroesCard.vue'
import NotesCard from '~/components/Player/NotesCard.vue'
import RanksCard from '~/components/Player/RanksCard/RanksCard.vue'
import ToggleFavorite from '~/components/Player/ToggleFavorite.vue'

export default Vue.extend({
	name: 'PlayersId',
	components: { ToggleFavorite, RanksCard, HeroesCard, PlayerStats, PlayerDetailsHeader, NotesCard },
	async asyncData ({ store, route }): Promise<void> {
		await store.dispatch('player/RESET')
		await store.dispatch('player/FETCH_PLAYER', route.params.id)
	},
	computed: {
		player (): Player { return this.$store.state.player.player },
	},
	mounted () {
		this.$store.dispatch('player/FETCH_ROSTER')
	},
})
</script>
