<template>
	<div class="card">
		<div class="card-content">
			<div class="columns">
				<div class="column">
					<fieldset class="field">
						<label for="sort">Order</label>
						<div class="select">
							<select id="sort" v-model="sort">
								<option value="gid:asc">GID</option>
								<option value="power:desc">Most Power</option>
								<option value="power:asc">Least Power</option>
								<option value="heroes:desc">Most Heroes</option>
								<option value="heroes:asc">Least Heroes</option>
								<option value="level:desc">Level</option>
								<option value="vip:desc">VIP</option>
								<option value="ratio:desc">Best Ratio</option>
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
								<option value="1000">None</option>
								<option value="250">250</option>
								<option value="100">100</option>
								<option value="50">50</option>
								<option value="10">10</option>
							</select>
						</div>
					</fieldset>
				</div>
				<div class="column">
					<fieldset class="field">
						<label for="heroes">Min Heroes</label>
						<div class="select">
							<select id="heroes" v-model="min_heroes">
								<option value="0">0</option>
								<option value="20">20</option>
								<option value="25">25</option>
								<option value="30">30</option>
								<option value="40">40</option>
								<option value="50">50</option>
								<option value="60">60</option>
								<option value="70">70</option>
							</select>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<fieldset class="field">
						<label class="checkbox" for="vip">
							<input id="vip" v-model="vip" type="checkbox"> VIP0
						</label>
						<label class="checkbox" for="scout">
							<input id="scout" v-model="scout" type="checkbox"> 🔍 Scouted
						</label>
						<label class="checkbox" for="favorite">
							<input id="favorite" v-model="favorite" type="checkbox"> ⭐ Favorite
						</label>
						<label class="checkbox" for="inactive">
							<input id="inactive" v-model="inactive" type="checkbox"> ⏱ Inactive
						</label>
					</fieldset>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'PlayersOrder',
	computed: {
		limit: {
			get () { return this.$store.state.players_limit },
			async set (value) { await this.$store.dispatch('SET_LIMIT', value) },
		},
		sort: {
			get () { return this.$store.state.players_sort },
			async set (value) { await this.$store.dispatch('SET_SORT', value) },
		},
		vip: {
			get () { return this.$store.state.players_vip },
			async set (value) { await this.$store.dispatch('SET_VIP', value) },
		},
		scout: {
			get () { return this.$store.state.players_scout },
			async set (value) { await this.$store.dispatch('SET_SCOUT', value) },
		},
		favorite: {
			get () { return this.$store.state.players_favorite },
			async set (value) { await this.$store.dispatch('SET_FAVORITE', value) },
		},
		inactive: {
			get () { return this.$store.state.players_inactive },
			async set (value) { await this.$store.dispatch('SET_INACTIVE', value) },
		},
		min_heroes: {
			get () { return this.$store.state.min_heroes },
			async set (value) { await this.$store.dispatch('SET_MIN_HEROES', value) },
		},
	},
})
</script>

<style scoped>
.checkbox + .checkbox {margin-left: 2rem;}
</style>
