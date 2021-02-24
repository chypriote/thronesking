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
								<option value="power:desc">Power</option>
								<option value="heroes:desc">Most Heroes</option>
								<option value="heroes:asc">Least Heroes</option>
								<option value="level:desc">Level</option>
								<option value="vip:desc">VIP</option>
							</select>
						</div>
					</fieldset>
					<fieldset class="field">
						<label class="checkbox" for="scout">
							<input id="scout" v-model="vip" type="checkbox">
							VIP0
						</label>
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
	},
})
</script>
