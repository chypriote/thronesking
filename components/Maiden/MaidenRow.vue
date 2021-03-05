<template>
	<tr>
		<td>
			<div class="maiden">
				<img v-if="maiden.maiden.picture" class="image" :src="maiden.maiden.picture.formats.thumbnail.url" :alt="maiden.maiden.name" />
				<p class="name">{{ maiden.maiden.name }}</p>
			</div>
		</td>
		<td>
			<div class="intimacy" :class="{'hint--top': maiden.intimacy - maiden.maiden.naughty}" :aria-label="`+${maiden.intimacy - maiden.maiden.naughty}`">{{ maiden.intimacy }}</div>
		</td>
		<td class="has-text-right">{{ maiden.charm }}</td>
		<td class="has-text-right">{{ maiden.experience |numeral }}</td>
	</tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { AccountMaiden } from '~/types/account'

export default Vue.extend({
	name: 'MaidenRow',
	props: {
		maiden: {
			type: Object as () => AccountMaiden,
			required: true,
		},
	},
})
</script>

<style scoped>
.maiden {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 1rem;
	width: 100%;
	.image {max-height: 3rem;}
	.name {
		font-size: 1.5rem;
		padding: 0 1rem;
		line-height: 1;
		margin-bottom: 0;
		flex: 1;
		text-align: left;
	}
}
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
