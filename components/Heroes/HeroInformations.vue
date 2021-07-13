<template>
	<div class="card">
		<div class="card-content">
			<div class="hero-details">
				<img v-if="hero.picture" :src="hero.picture.formats.thumbnail.url" :alt="hero.name" class="picture" />
				<h1>{{ hero.name }}</h1>
				<div class="focuses">
					<img :src="require(`~/assets/${hero.focus}.png`)" :alt="hero.focus" class="focus">
					<img v-if="hero.second_focus" :src="require(`~/assets/${hero.second_focus}.png`)" :alt="hero.second_focus" class="second">
				</div>
			</div>
			<hero-level />
			<div class="columns is-multiline hero-attributes">
				<div class="column is-half attribute">
					<img src="~/assets/military.png" alt="Military" class="attribute-img">
					{{ military * level * (level / 10) |numeral }}
				</div>
				<div class="column is-half attribute">
					<img src="~/assets/fortune.png" alt="Fortune" class="attribute-img">
					{{ fortune * level * (level / 10) |numeral }}
				</div>
				<div class="column is-half attribute">
					<img src="~/assets/provisions.png" alt="Provisions" class="attribute-img">
					{{ provisions * level * (level / 10) |numeral }}
				</div>
				<div class="column is-half attribute">
					<img src="~/assets/inspiration.png" alt="Inspiration" class="attribute-img">
					{{ inspiration * level * (level / 10) |numeral }}
				</div>
				<div class="quality">{{ `Total quality: ${quality}` }}</div>
			</div>
		</div>
		<div class="card-footer">
			<button class="card-footer-item" @click.prevent="setMax">Max</button>
			<button class="card-footer-item" @click.prevent="reset">Reset</button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Hero } from '~/types/Hero'
import HeroLevel from '~/components/Heroes/HeroLevel.vue'

export default Vue.extend({
	name: 'HeroCard',
	components: { HeroLevel },
	computed: {
		hero (): Hero { return this.$store.state.game.heroes.hero },
		level (): Hero { return this.$store.state.game.heroes.level },
		quality (): number { return this.$store.getters['game/heroes/quality'] },
		military (): number { return this.$store.getters['game/heroes/military'] },
		fortune (): number { return this.$store.getters['game/heroes/fortune'] },
		provisions (): number { return this.$store.getters['game/heroes/provisions'] },
		inspiration (): number { return this.$store.getters['game/heroes/inspiration'] },
	},
	methods: {
		setMax () { this.$store.commit('game/heroes/SET_ALL_SKILLS_LEVEL', 350) },
		reset () { this.$store.dispatch('game/heroes/RESET_ALL_SKILLS') },
	},
})
</script>

<style scoped>
h1 {font-size: 2rem;}
.hero-details {
	text-align: center;
	position: relative;
	.focuses {
		position: absolute;
		top: 0;
		left: .5rem;
		.focus {
			max-height: 2rem;
			max-width: 2rem;
		}
		.second {
			position: absolute;
			top: .75rem;
			right: -1rem;
			max-height: 1.5rem;
			max-width: 1.5rem;
		}
	}
}
.hero-attributes {
	padding: .5rem;
	.attribute-img {max-height: 1.5rem;width: 1.5rem;margin-right: .5rem;}
	.attribute {
		display: flex;
		align-items: center;
		font-size: 1.2rem;
		line-height: 1;
	}
}
</style>
