<template>
	<div class="card bordered">
		<header><h4 class="title is-5">Notes</h4></header>
		<div class="card-content">
			<template v-if="!editing">{{ notes }}</template>
			<textarea v-else id="notes" v-model="edited" class="textarea" aria-label="notes" rows="5" />
			<footer class="actions" :style="{'justify-content': loading || !editing ? 'flex-end' : 'space-between'}">
				<button v-if="!loading" class="button" @click="toggleEditing">{{ editing ? 'Cancel' : 'Edit' }}</button>
				<button v-if="editing || loading" class="button --primary" :class="{'is-loading': loading}" @click="saveNotes">Save</button>
			</footer>
		</div>
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
textarea {
	margin-bottom: 1rem;
}
.actions {
	display: flex;
}
</style>
