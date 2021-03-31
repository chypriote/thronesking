<template>
	<div class="card bordered" :class="{'touched': touched, 'editing': editing}">
		<div class="hero" @click="toggleTouched">
			<img v-if="hero.picture" class="image" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" />
			<span class="name">{{ hero.name }}</span>
		</div>
		<form v-show="editing" class="edit" @submit.prevent="updateHero">
			<fieldset class="field is-grouped has-addons">
				<div class="control is-expanded">
					<div class="field has-addons">
						<div class="control">
							<button class="button" type="button" :disabled="(quality - 1) < 1" @click.prevent="quality = Math.max(quality - 1, 0)">
								<span class="icon is-small">-1</span>
							</button>
						</div>
						<div class="control">
							<input :id="`${hero.id}-quality`" v-model="quality" class="input" aria-label="quality" type="number" placeholder="Quality" />
						</div>
						<div class="control">
							<button class="button" type="button" @click.prevent="quality = parseInt(quality.toString()) + 1">
								<span class="icon is-small">+1</span>
							</button>
						</div>
					</div>
				</div>
				<div class="control">
					<button type="submit" class="button --primary --submit" :class="{'is-loading': loading}">💾</button>
				</div>
			</fieldset>
		</form>
		<div v-show="!editing" class="quality" :class="{'hint--top': boost}" :aria-label="`+${boost}`" @click="toggleEdit">{{ hero.quality }}</div>
	</div>
</template>

<script lang="ts">
import { clone } from 'lodash-es'
import Vue from 'vue'
import { Hero } from '~/types'

export default Vue.extend({
	name: 'HeroCard',
	props: {
		hero: {
			type: Object as () => Hero,
			required: true,
		},
	},
	data: () => ({ editing: false, loading: false, quality: 0, touched: false }),
	computed: {
		boost (): number { return this.hero.quality - this.hero.base },
	},
	methods: {
		toggleTouched () {
			if (this.editing) { return }
			this.touched = !this.touched
		},
		toggleEdit () {
			this.editing = !this.editing
			this.loading = false
			this.quality = clone(this.hero.quality)
			this.touched = false
			setTimeout(() => { document.getElementById(`${this.hero.id}-quality`)?.focus() }, 200)
		},
		async updateHero () {
			if (!this.hero.id) { return }
			this.loading = true
			await this.$store.dispatch('player/UPDATE_HERO', { hero: this.hero, quality: this.quality })
			this.editing = false
			this.loading = false
			this.touched = true
		},
	},
})
</script>

<style scoped>
.hero {
	display: flex;
	flex-direction: row;
	padding: 0 1rem;
	width: 100%;
	min-height: 4rem;
	transition: all 200ms ease-in-out;
	.image {max-height: 4rem;}
	.name {
		flex: 1;
		padding: 1rem 1rem;
		margin-bottom: 0;
		font-size: 1.5rem;
		line-height: 1;
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: break-all;
		overflow: hidden;
	}
}
.card {
	margin-top: 0;
	display: flex;
	flex-direction: column;
	transition: all 200ms ease-in-out;
	&:hover:not(.editing) {
		cursor: pointer;
		transform: translate(0, -.25rem);
	}
	&.touched {
		background-color: rgba(0, 0, 0, .3);
		.hero {opacity: .3;}
	}
}
.edit {
	display: flex;
	align-items: center;
	margin-top: .5rem;
	padding: .5rem .5rem 1rem;
	.--submit {padding: .5rem .5rem;}
}
.control {display: flex;}
.field.is-grouped > .control:not(:last-child) {margin-right: 0;}
.quality {
	position: absolute;
	right: -.5rem;
	bottom: -.5rem;
	max-width: 2.5rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: .5rem;
	background-color: var(--background-color);
	border: 1px solid var(--foreground-color-high-contrast);
	cursor: pointer;
	z-index: 10;
	&:hover {background-color: rgba(0, 0, 0, .5);}
	&.hint--top {font-weight: bold;}
}
.set-touched {
	position: absolute;
	top: -.5rem;
	right: -.5rem;
	opacity: .5;
	cursor: pointer;
	&:hover {opacity: 1;}
}
</style>
