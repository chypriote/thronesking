<template>
	<div>
		<div class="media">
			<div class="media-left">
				<figure class="image is-48x48">
					<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder">
				</figure>
			</div>
			<div class="media-content">
				<h2 class="title is-4">{{ player.name }}</h2>
				<p class="subtitle is-6">{{ `VIP${player.vip}` }}</p>
				<p class="subtitle is-6">{{ `Level ${rank.level}` }}</p>
			</div>
		</div>
		<div class="card-footer">
			<div class="card-footer-item">{{ rank.rank }}</div>
			<div class="card-footer-item">{{ `${rank.power}KP` }}</div>
			<div class="card-footer-item">{{ alliance ? alliance.name : '-' }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
	name: 'PlayerInformations',
	computed: {
		...mapState(['player']),
		alliance () { return this.player.alliance },
		rank () { return this.player.rank },
	},
})
</script>
