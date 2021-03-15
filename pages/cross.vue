<template>
	<div class="columns is-multiline">
		<div v-if="alliance" class="column is-full">
			{{ `Last updated ${format(new Date(alliance.updated_at), 'dd/MM HH:ii')}` }}
		</div>
		<div class="column is-three-quarters">
			<cross-server-table />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'date-fns'
import { MetaInfo } from 'vue-meta'
import { Alliance } from '~/types'
import CrossServerTable from '~/components/CrossServer/CrossServerTable.vue'

export default Vue.extend({
	name: 'CrossServer',
	components: { CrossServerTable },
	async asyncData ({ store }) {
		await store.dispatch('cross/FETCH_ALLIANCES')
		await store.dispatch('account/heroes/FETCH_ROSTER')
	},
	data: () => ({ format }),
	head: (): MetaInfo => ({ title: 'Cross Server Alliances' }),
	computed: {
		alliances (): Alliance[] { return this.$store.state.alliances },
		alliance (): Alliance|null { return this.alliances.length ? this.alliances[0] : null },
	},
})
</script>
