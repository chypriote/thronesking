<template>
	<div class="table-container">
	<table class="table is-striped is-hoverable is-fullwidth">
		<thead>
			<tr>
				<th>Rank</th>
				<th>Name</th>
				<th>VIP</th>
				<th>Alliance</th>
				<th>Power</th>
			</tr>
		</thead>
		<tbody>
			<ranking-row v-for="(rank, index) of players" :key="rank.id" :rank="rank" :index="index" />
		</tbody>
	</table>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import RankingRow from '~/components/Player/RankingRow.vue'

export default Vue.extend({
	name: 'RankingTable',
	components: { RankingRow },
	data: () => ({ loading: true }),
	computed: {
		...mapState(['players']),
	},
})
</script>

<style scoped>
th {
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 10;
}
</style>
