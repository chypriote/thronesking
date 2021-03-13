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
			<div class="columns">
				<section class="members column is-full is-half-tablet">
					<header>Members</header>
					<div v-for="member of activeMembers" :key="member.id" class="member">
						<div class="details">
							<span v-if="member.player.favorite">⭐</span>
							<span v-if="member.player.inactive === true">⏱</span>
						</div>
						<nuxt-link :to="{name: 'players-id', params: {id: member.player.id }}" class="name">{{ member.player.name }}</nuxt-link>
						<div class="power">{{ member.player.power |numeral }}</div>
						<div class="vip">{{ `VIP ${member.player.vip}` }}</div>
					</div>
				</section>

				<section v-if="previousMembers.length" class="previous column is-full is-half-tablet">
					<header>Previous Members</header>
					<div v-for="member of previousMembers" :key="member.id" class="member">
						<div class="details">
							<span v-if="member.player.favorite">⭐</span>
							<span v-if="member.player.inactive === true">⏱</span>
						</div>
						<nuxt-link :to="{name: 'players-id', params: {id: member.player.id }}" class="name">{{ member.player.name }}</nuxt-link>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { filter, orderBy } from 'lodash-es'
import { Alliance, AllianceMember } from '~/types'

export default Vue.extend({
	name: 'AllianceDetails',
	computed: {
		alliance (): Alliance { return this.$store.state.alliance },
		members (): AllianceMember[] { return this.alliance.members },
		activeMembers (): AllianceMember[] { return orderBy(filter(this.members, member => member.active), ['inactive', 'vip'], ['asc', 'desc']) },
		previousMembers (): AllianceMember[] { return orderBy(filter(this.members, member => !member.active), ['inactive', 'vip'], ['asc', 'desc']) },
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
.member {
	display: flex;
	align-items: center;
	.details {
		padding: 0 .5rem;
		white-space: nowrap;
		flex-basis: 15%;
		min-width: 15%;
	}
	.power {
		padding: 0 .5rem;
		white-space: nowrap;
	}
	.vip {
		flex-basis: 10%;
		min-width: 10%;
		white-space: nowrap;
	}
	.name {flex-grow: 1;}
}
.members, .previous {
	header {font-weight: bold;}
}
.stats {
	display: flex;
	text-align: left;
	.stat {flex: 1;}
	.stat-label {
		color: var(--text-color-lighter);
	}
}
</style>
