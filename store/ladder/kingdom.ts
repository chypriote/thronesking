import { ActionTree, MutationTree } from 'vuex'
import { KingdomRanking } from '~/types'

interface IState {
	ladder: KingdomRanking[]
}

export const state = (): IState => ({
	ladder: [],
})

export const mutations: MutationTree<IState> = {
	SET_LADDER (state: IState, rankings: KingdomRanking[]) {
		state.ladder = rankings
	},
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_LADDER ({ commit }) {
		try {
			commit('SET_LADDER', await this.$strapi.find('ladders/kingdom'))
		} catch (e) { console.log(e) }
	},
}
