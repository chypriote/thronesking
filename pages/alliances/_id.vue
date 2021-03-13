<template>
	<div class="columns">
		<div class="column is-full is-two-thirds-desktop">
			<alliance-details />
		</div>
		<div class="column is-full is-one-third-desktop">
			<top-alliance />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { Alliance } from '~/types'
import AllianceDetails from '~/components/Alliance/AllianceDetails.vue'
import TopAlliance from '~/components/Leaderboards/TopAlliance.vue'

export default Vue.extend({
	name: 'AlliancesId',
	components: { AllianceDetails, TopAlliance },
	async asyncData ({ store, route }): Promise<void> {
		await store.dispatch('FETCH_ALLIANCE', route.params.id)
	},
	head (): MetaInfo { return { title: this.alliance.name } },
	computed: {
		alliance (): Alliance { return this.$store.state.alliance },
	},
})
</script>
