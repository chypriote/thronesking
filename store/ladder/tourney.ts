import { ActionTree, MutationTree } from 'vuex'
import { TourneyRanking } from '~/types'

interface IState {
	ladder: TourneyRanking[]
	current: TourneyRanking[]
}

export const state = (): IState => ({
	ladder: [],
	current: [],
})

export const mutations: MutationTree<IState> = {
	SET_LADDER (state: IState, rankings: TourneyRanking[]) {
		state.ladder = rankings
	},
	SET_PLAYER_RANKINGS (state: IState, rankings: TourneyRanking[]) {
		state.current = rankings
	},
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_LADDER ({ commit }) {
		try {
			commit('SET_LADDER', await this.$strapi.find('ladders/tourney'))
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER_RANKINGS ({ commit }, id) {
		try {
			commit('SET_PLAYER_RANKINGS', await this.$strapi.find('tourney-rankings', { player: id, _sort: 'created_at:asc' }))
		} catch (e) { console.log(e) }
	},
}
