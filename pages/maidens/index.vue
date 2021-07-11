<template>
	<div class="columns is-multiline">
		<div v-for="maiden of maidens" :key="maiden.id" class="column is-one-third">
			<maiden-card :maiden="maiden" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import MaidenCard from '~/components/Maidens/MaidenCard.vue'

export default Vue.extend({
	name: 'Maidens',
	components: { MaidenCard },
	async asyncData ({ $strapi }) {
		const maidens = await $strapi.find('maidens', { _sort: 'name:asc' })
		return { maidens }
	},
})
</script>
