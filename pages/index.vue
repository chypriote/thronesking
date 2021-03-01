<template>
	<div>
		<div class="columns is-multiline">
			<div class="column is-full is-one-third-desktop">
				<top-kingdom />
			</div>
			<div class="column is-full is-one-third-desktop">
				<top-tourney />
			</div>
			<div class="column is-full is-one-third-desktop">
				<top-alliance />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import TopKingdom from '~/components/Leaderboards/TopKingdom.vue'
import TopTourney from '~/components/Leaderboards/TopTourney.vue'
import TopAlliance from '~/components/Leaderboards/TopAlliance.vue'

export default Vue.extend({
	name: 'Index',
	components: { TopKingdom, TopTourney, TopAlliance },
})
</script>
