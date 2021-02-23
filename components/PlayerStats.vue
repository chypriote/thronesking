<template>
	<div>
		<div class="stats">
			<player-stat v-if="rank" :label="'Kingdom Power'" :tooltip="Number(rank.power).toLocaleString()" :value="numeral(rank.power).format('0.0a').toUpperCase()" />
			<player-stat v-if="rank" :label="'Level'" :value="rank.level" />
			<player-stat :label="'Scouted'" :value="player.roster.length" />
		</div>
		<div class="stats">
			<player-stat :label="'Heroes'" :value="player.heroes" />
			<player-stat :label="'Maidens'" :value="player.maidens" />
			<player-stat :label="'Children'" :value="player.children" />
		</div>
		<div class="stats">
			<player-stat v-if="alliance" :label="'Alliance'" :value="alliance.name" :link="{ name: 'alliances-id', params: { id: alliance.id } }" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import numeral from 'numeral'
import { Alliance, Player, KingdomRanking } from '~/types'
import PlayerStat from '~/components/PlayerStat.vue'

export default Vue.extend({
	name: 'PlayerStats',
	components: { PlayerStat },
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
	},
	data: () => ({ numeral }),
	computed: {
		alliance (): Alliance|undefined { return this.player.alliance },
		rank (): KingdomRanking|undefined { return this.player.rankings.kingdom },
	},
})
</script>

<style scoped>
.stats {
	display: flex;
	text-align: left;
	line-height: 1;
	&:not(:last-of-type) {margin-bottom: 1rem;}
}
</style>
