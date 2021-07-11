<template>
	<div class="columns is-multiline">
		<div class="column is-full">
			{{ `Last updated ${format(new Date(hero.updated_at), 'dd/MM HH:ii')}` }}
		</div>
		<div class="column">
			<roster-table />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'date-fns'
import { MetaInfo } from 'vue-meta'
import { AccountHero } from '~/types/account'
import RosterTable from '~/components/Roster/RosterTable.vue'

export default Vue.extend({
	name: 'Roster',
	components: { RosterTable },
	async asyncData ({ store }) {
		await store.dispatch('account/heroes/FETCH_ROSTER')
	},
	data: () => ({ format }),
	head: (): MetaInfo => ({ title: 'Roster' }),
	computed: {
		roster (): AccountHero[] { return this.$store.state.account.heroes.heroes },
		hero (): AccountHero|null { return this.roster.length ? this.roster[0] : null },
	},
})
</script>
