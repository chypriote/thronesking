<template>
	<div>
		<div class="stats">
			<player-stat :label="'Kingdom Power'" :tooltip="player.power |formatted" :value="player.power |numeral" />
			<player-stat :label="'Level'" :value="player.level" />
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
import { Alliance, Player } from '~/types'
import PlayerStat from '~/components/Global/PlayerStat.vue'

export default Vue.extend({
	name: 'PlayerStats',
	components: { PlayerStat },
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
	},
	computed: {
		alliance (): Alliance|null { return this.player.alliance },
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
