<template>
	<div class="content">
		<div class="card">
			<div class="card-content">
				{{ alliance }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
	name: 'AlliancesId',
	async asyncData ({ store, route }): Promise<void> {
		await store.dispatch('FETCH_ALLIANCE', route.params.id)
	},
	computed: {
		...mapState(['alliance']),
	},
})
</script>
