<template>
	<div class="columns is-multiline">
		<div class="column is-full">
			{{ `Last updated ${format(new Date(), 'dd/MM HH:ii')}` }}
		</div>
		<div class="column">
			<maiden-table />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'date-fns'
import { MetaInfo } from 'vue-meta'
import MaidenTable from '~/components/Maiden/MaidenTable.vue'

export default Vue.extend({
	name: 'Maiden',
	components: { MaidenTable },
	async asyncData ({ store }) {
		await store.dispatch('account/maiden/FETCH_MAIDENS')
	},
	data: () => ({ format }),
	head: (): MetaInfo => ({ title: 'Maidens' }),
})
</script>
