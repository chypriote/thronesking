import { ActionTree, MutationTree } from 'vuex'
import { KingdomRanking } from '~/types'
import { RootState } from '~/store'

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

export const actions: ActionTree<IState, RootState> = {
	async FETCH_LADDER ({ commit, rootState }) {
		try {
			commit('SET_LADDER', await this.$strapi.find('players', { _limit: 100, _sort: 'power:desc', server: rootState.server }))
		} catch (e) { console.log(e) }
	},
}
