<template>
	<div class="card">
		<button
			class="button --primary is-fullwidth is-outlined"
			:class="{'is-loading': loading}"
			type="button"
			@click.prevent="toggleFavorite"
		>
			{{ player.favorite ? 'Remove from favorites' : 'Add to favorites' }}
		</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Player } from '~/types'

export default Vue.extend({
	name: 'ToggleFavorite',
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
	},
	data: () => ({ loading: false }),
	methods: {
		async toggleFavorite () {
			this.loading = true
			await this.$store.dispatch('player/TOGGLE_FAVORITE', this.player.id)
			this.loading = false
		},
	},
})
</script>
