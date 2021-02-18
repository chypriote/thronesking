<template>
	<div class="columns">
		<div class="column is-three-fifths">
			<ranking-table />
		</div>
		<div class="column is-two-fifths">
			<div class="sticky">
				<nuxt-child />
				<alliance-table />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import RankingTable from '~/components/RankingTable.vue'
import AllianceTable from '~/components/AllianceTable.vue'

export default Vue.extend({
	components: { RankingTable, AllianceTable },
})
</script>

<style scoped>
.sticky {
	position: sticky;
	top: 0;
}
</style>
