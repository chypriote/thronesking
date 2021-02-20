<template>
	<div class="card bordered">
		<header>
			<div class="alliance">
				<h2>{{ alliance.name }}</h2>
				<p class="subtitle">{{ alliance.aid }}</p>
			</div>
		</header>
		<div class="card-content">
			<div class="stats">
				<div class="stat">{{ Number(alliance.power).toLocaleString() }} <span class="stat-label"> Power</span></div>
				<div class="stat"><span class="stat-label">Level</span> {{ alliance.level }}</div>
				<div class="stat">{{ alliance.reputation }} <span class="stat-label">Reputation</span></div>
			</div>
		</div>
		<div class="card-content">
			<p>Members</p>
			<div v-for="member of activeMembers" :key="member.id" class="member">
				{{ member.player.name }}
			</div>

			<template v-if="previousMembers.length">
				<p>Previous Members</p>
				<div v-for="member of previousMembers" :key="member.id" class="member">
					{{ member.player.name }}
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Alliance, AllianceMembers } from '~/types/types'

export default Vue.extend({
	name: 'AllianceDetails',
	computed: {
		alliance (): Alliance { return this.$store.state.alliance },
		members (): AllianceMembers[] { return this.alliance.members },
		activeMembers (): AllianceMembers[] { return this.members.filter(member => member.active) },
		previousMembers (): AllianceMembers[] { return this.members.filter(member => !member.active) },
	},
})
</script>

<style scoped>
header {
	display: flex;
	.alliance {
		flex-grow: 1;
	}
	.rank {
		font-size: 2rem;
		font-weight: bold;
		color: var(--text-color-primary);
	}
}
.stats {
	display: flex;
	text-align: left;
	.stat {flex: 1;}
	.stat-label {
		color: var(--text-color-muted);
	}
}
</style>
