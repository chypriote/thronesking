<template>
	<v-select
		id="player"
		v-model="player"
		:input-id="'player-search'"
		:options="players"
		required
		label="name"
		:reduce="player => player.id"
		@search="debounceInput"
		@input="goToPlayer"
	>
		<template #selected-option="option">
			<div class="option selected">
				<span class="name">{{ option.name }}</span> - <span class="uid">{{ option.gid }}</span>
			</div>
		</template>
		<template #option="option">
			<div class="option">
				<span class="name">{{ option.name }}</span> - <span class="uid">{{ option.gid }}</span>
			</div>
		</template>
		<template #spinner><span v-show="loading" class="loader" /></template>
		<template #open-indicator />
	</v-select>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash-es'
import { Player } from '~/types'

interface IData {
	players: Player[]
	player: Player|null
	loading: boolean
}

export default Vue.extend({
	name: 'PlayerSearch',
	data: (): IData => ({
		players: [],
		player: null,
		loading: false,
	}),
	methods: {
		debounceInput: debounce(function (value): any {
			// @ts-ignore
			this.searchPlayers(value)
		}, 400),
		async searchPlayers (value: string|null) {
			if (!value) { return }
			this.loading = true
			this.players = []
			this.players = await this.$strapi.find('players', { name_contains: value })
			this.loading = false
		},
		goToPlayer (id: number|null) {
			if (!id) { return }
			this.$router.push({ name: 'players-id', params: { id: id.toString() } })
		},
	},
})
</script>

<style scoped>
.v-select {
	width: 100%;
}
.option.selected {
	word-break: break-all;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
}
</style>
