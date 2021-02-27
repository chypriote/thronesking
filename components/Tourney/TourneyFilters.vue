<template>
	<div class="card bordered">
		<div class="card-content">
			<div class="columns">
				<div class="column">
					<fieldset class="field">
						<label for="heroes">Min Heroes</label>
						<input id="heroes" v-model="heroes" type="number" class="input" autocomplete="off" />
					</fieldset>
				</div>
				<div class="column">
					<fieldset class="field">
						<label for="sort">Order</label>
						<div class="select">
							<select id="sort" v-model="sort">
								<option value="player.heroes:desc">Heroes</option>
								<option value="points:desc">Points</option>
								<option value="ratio:desc">Top Ratio </option>
								<option value="ratio:asc">Worst Ratio</option>
							</select>
						</div>
					</fieldset>
				</div>
				<div class="column">
					<fieldset class="field">
						<label for="limit">Top</label>
						<div class="select">
							<select id="limit" v-model="limit">
								<option value="100">100</option>
								<option value="50">50</option>
								<option value="25">25</option>
								<option value="10">10</option>
							</select>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<label class="checkbox" for="scout">
						<input id="scout" v-model="scout" type="checkbox"> 🔍 Scouted
					</label>
					<label class="checkbox" for="favorite">
						<input id="favorite" v-model="favorite" type="checkbox"> ⭐ Favorite
					</label>
					<label class="checkbox" for="inactive">
						<input id="inactive" v-model="inactive" type="checkbox"> ⏱ Inactive
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'TourneyFilters',
	computed: {
		heroes: {
			get () { return this.$store.state.ladder.tourney.heroes },
			async set (value) { await this.$store.dispatch('ladder/tourney/SET_MIN_HEROES', value) },
		},
		limit: {
			get () { return this.$store.state.ladder.tourney.limit },
			async set (value) { await this.$store.dispatch('ladder/tourney/SET_LIMIT', value) },
		},
		sort: {
			get () { return this.$store.state.ladder.tourney.sort },
			async set (value) { await this.$store.dispatch('ladder/tourney/SET_SORT', value) },
		},
		scout: {
			get () { return this.$store.state.ladder.tourney.scout },
			async set (value) { await this.$store.dispatch('ladder/tourney/SET_SCOUT', value) },
		},
		favorite: {
			get () { return this.$store.state.ladder.tourney.favorite },
			async set (value) { await this.$store.dispatch('ladder/tourney/SET_FAVORITE', value) },
		},
		inactive: {
			get () { return this.$store.state.ladder.tourney.inactive },
			async set (value) { await this.$store.dispatch('ladder/tourney/SET_INACTIVE', value) },
		},
	},
})
</script>

<style scoped>
.checkbox + .checkbox {margin-left: 2rem;}
</style>
