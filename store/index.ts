import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Alliance, Player, Ranking } from '~/types/types'

interface IState {
	player: Player | null
	rankings: Ranking[]
	alliances: Alliance[]
}

export const state = (): IState => ({
	rankings: [],
	alliances: [],
	player: null,
})

export const getters: GetterTree<IState, IState> = {
}

export const mutations: MutationTree<IState> = {
	SET_RANKINGS (state: IState, rankings: Ranking[]) {
		state.rankings = rankings
	},
	SET_ALLIANCES (state: IState, alliances: Alliance[]) {
		state.alliances = alliances
	},
	SET_PLAYER (state: IState, player: Player|null) {
		state.player = player
	}
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_RANKINGS ({ commit }) {
		try {
			commit('SET_RANKINGS', await this.$strapi.find('rankings/ladder'))
		} catch (e) {console.log(e)}
	},

	async FETCH_ALLIANCES ({ commit }) {
		try {
			commit('SET_ALLIANCES', await this.$strapi.find('alliances', {_sort: 'power:desc'}))
		} catch (e) {console.log(e)}
	},

	async FETCH_PLAYER ({ commit }, id) {
		try {
			commit('SET_PLAYER', await this.$strapi.$http.get(`players/informations/${id}`).then(response => response.json()))
		} catch (e) {console.log(e)}
	},

}
