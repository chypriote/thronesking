<template>
	<tr>
		<td>
			<div class="maiden">
				<img v-if="maiden.picture" class="image" :src="maiden.picture.formats.thumbnail.url" :alt="maiden.name" />
				<p class="name">{{ maiden.name }}</p>
			</div>
		</td>
		<td>
			<div class="intimacy" :class="{'hint--top': wife.intimacy - maiden.naughty}" :aria-label="`+${wife.intimacy - maiden.naughty}`">{{ wife.intimacy }}</div>
		</td>
		<td class="has-text-right">{{ wife.charm }}</td>
		<td class="has-text-right">{{ wife.experience |numeral }}</td>
		<td>
			<div class="bond">
				<img v-if="bond.picture" class="image" :src="bond.picture.formats.thumbnail.url" :alt="bond.name" />
				<p class="name">{{ bond.name }}</p>
			</div>
		</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { AccountMaiden } from '~/types/account'
import { Hero, Maiden } from '~/types'

export default Vue.extend({
	name: 'MaidenRow',
	props: {
		wife: {
			type: Object as () => AccountMaiden,
			required: true,
		},
	},
	computed: {
		maiden (): Maiden { return this.wife.maiden },
		bond (): Hero { return this.maiden.hero },
	},
})
</script>

<style scoped>
.maiden, .bond {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 1rem;
	width: 100%;
	.name {
		font-size: 1.5rem;
		padding: 0 1rem;
		line-height: 1;
		margin-bottom: 0;
		flex: 1;
		text-align: left;
	}
}
.maiden .image {max-height: 5rem;}
.bond .image {max-height: 3rem;}
.intimacy {
	width: 2rem;
	height: 2rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: .25rem;
	background-color: var(--background-color);
	border: 1px solid var(--foreground-color-high-contrast);
	cursor: pointer;
	&.hint--top {font-weight: bold;}
}
</style>
