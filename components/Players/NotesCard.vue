<template>
	<div class="card bordered">
		<header><h4 class="title is-5">Notes</h4></header>
		<form class="card-content" @submit.prevent="saveNotes">
			<div v-if="!editing" class="note">{{ notes }}</div>
			<textarea v-else id="notes" v-model="edited" class="textarea" aria-label="notes" rows="5" />
			<footer class="actions" :style="{'justify-content': loading || !editing ? 'flex-end' : 'space-between'}">
				<button v-if="!loading" type="button" class="button" @click="toggleEditing">{{ editing ? 'Cancel' : 'Edit' }}</button>
				<button v-if="editing || loading" type="submit" class="button --primary" :class="{'is-loading': loading}" @click="saveNotes">Save</button>
			</footer>
		</form>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { clone } from 'lodash-es'

export default Vue.extend({
	name: 'NotesCard',
	data: () => ({ editing: false, loading: false, edited: null }),
	computed: {
		notes () { return this.$store.state.player.notes },
	},
	methods: {
		toggleEditing () {
			this.editing = !this.editing
			if (this.editing) { this.edited = clone(this.notes) }
		},
		async saveNotes () {
			this.loading = true
			await this.$store.dispatch('SAVE_NOTES', this.edited)
			this.editing = false
			this.loading = false
		},
	},
})
</script>

<style scoped>
.note {
	white-space: pre;
}
.actions {
	margin-top: 1rem;
	display: flex;
}
</style>
