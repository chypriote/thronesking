<template>
	<div class="content">
		<alliance-details />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { Alliance } from '~/types'
import AllianceDetails from '~/components/Alliance/AllianceDetails.vue'

export default Vue.extend({
	name: 'AlliancesId',
	components: { AllianceDetails },
	async asyncData ({ store, route }): Promise<void> {
		await store.dispatch('FETCH_ALLIANCE', route.params.id)
	},
	head (): MetaInfo { return { title: this.alliance.name } },
	computed: {
		alliance (): Alliance { return this.$store.state.alliance },
	},
})
</script>
