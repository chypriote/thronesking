import { ActionTree, MutationTree } from 'vuex'
import { Hero, Paragon, QualitySkill } from '~/types'
import { RootState } from '~/store/index'

export interface IState {
	hero: Hero | null
	skills: QualitySkill[]
	paragons: Paragon[]
}
export const state = (): IState => ({
	hero: null,
	skills: [],
	paragons: [],
})

export const mutations: MutationTree<IState> = {
	SET_HERO(state: IState, hero: Hero | null) {
		state.hero = hero
	},
}

export const actions: ActionTree<IState, RootState> = {
	async SELECT_HERO({ commit }, hero: Hero) {
		commit('SET_HERO', hero)
		const [skills, paragons] = await Promise.all([
			this.$strapi.find('quality-skills', { hero: hero.id }),
			this.$strapi.find('paragons', { hero: hero.id }),
		])
		commit('SET_SKILLS', skills)
		commit('SET_PARAGONS', paragons)
	},
}
