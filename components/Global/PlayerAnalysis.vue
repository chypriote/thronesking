<template>
	<div class="roster">
		<div class="set">
			<fieldset>
				<div class="analysis-label">Heroes</div>
				<div class="analysis-value">{{ player.heroes }}</div>
			</fieldset>
			<fieldset>
				<div class="analysis-label">Scouted</div>
				<div class="analysis-value">{{ roster.length }}</div>
			</fieldset>
			<fieldset>
				<div class="analysis-label">Scouted %</div>
				<div class="analysis-value">{{ scouted |percent }}</div>
			</fieldset>
		</div>
		<div class="set">
			<fieldset>
				<div class="analysis-label">
					<span
						v-if="roster.length !== player.heroes"
						class="hint hint--top"
						:aria-label="`${player.heroes - roster.length} hero${player.heroes - roster.length>1 ?'es':''} not scouted`">
						⚠
					</span>
					Top Scouted Hero
				</div>
				<div class="top-hero">
					<img v-if="top_hero.picture" :src="top_hero.picture.url" :alt="top_hero.name" />
					<div class="name">{{ top_hero.name }}</div>
					<div class="quality">{{ top_hero.quality }}</div>
				</div>
			</fieldset>
		</div>
		<div class="set">
			<fieldset>
				<div class="analysis-label">Av. Quality</div>
				<div class="analysis-value">{{ qRatio }} <span class="precision">/{{ roster.length }}</span></div>
			</fieldset>
			<fieldset>
				<div class="analysis-label">Unevolved</div>
				<div class="analysis-value">{{ unevolved.length }}</div>
			</fieldset>
			<fieldset>
				<!--eslint-disable-next-line vue/no-parsing-error-->
				<div class="analysis-label">< 20 Quality</div>
				<div class="analysis-value">{{ low.length }}</div>
			</fieldset>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { orderBy, reduce } from 'lodash-es'
import { Player, PlayerHero } from '~/types'

export default Vue.extend({
	name: 'PlayerAnalysis',
	props: {
		player: {
			type: Object as () => Player,
			required: true,
		},
	},
	computed: {
		roster (): PlayerHero[] { return this.player?.roster || [] },
		scouted (): number { return (this.roster.length / this.player.heroes) * 100 },
		top_hero (): PlayerHero|null { return orderBy(this.roster, 'quality', 'asc')?.pop() || null },
		qRatio (): string|number|undefined {
			if (this.roster.length < 2) { return this.roster[0].quality }

			const roster = orderBy(this.roster, 'quality', 'desc')
			roster.shift()
			const totalQuality = reduce(roster, (sum: number, h: PlayerHero) => { return sum + h.quality }, 0)
			return (totalQuality / roster.length).toFixed(1)
		},
		unevolved (): PlayerHero[] { return this.roster.filter(h => h.quality - h.base < 4 || h.quality < 18) },
		low (): PlayerHero[] { return this.roster.filter(h => h.quality < 20) },
	},
})
</script>

<style scoped>
.roster {
	display: flex;
	flex-direction: column;
}
.set {
	display: flex;
	&:not(:last-of-type) {margin-bottom: 1rem;}
}
fieldset {
	flex: 1;
	display: flex;
	flex-direction: column;
	.analysis-label {
		font-size: .7rem;
		color: var(--text-color-medium);
		text-transform: uppercase;
		margin-bottom: .25rem;
		& > .hint {text-transform: initial;}
	}
	.precision {
		font-size: .9rem;
		color: var(--text-color-muted);
	}
}
.top-hero {
	display: flex;
	align-items: center;
	img {height: 3rem;}
	.name {
		font-size: 1.5rem;
		flex: 1;
		padding: 0 1rem;
	}
	.quality {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: .25rem .5rem;
		background-color: var(--background-color);
		border: 1px solid var(--foreground-color-high-contrast);
	}
}
</style>
