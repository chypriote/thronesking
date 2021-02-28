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
import RosterTable from '~/components/Roster/RosterTable.vue'
import { OwnedHero } from '~/types'

export default Vue.extend({
	name: 'Roster',
	components: { RosterTable },
	async asyncData ({ store }) {
		await store.dispatch('roster/FETCH_ROSTER')
	},
	data: () => ({ format }),
	computed: {
		roster (): OwnedHero[] { return this.$store.state.roster.heroes },
		hero (): OwnedHero|null { return this.roster.length ? this.roster[0] : null },
	},
})
</script>
