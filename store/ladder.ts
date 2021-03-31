import { ActionTree, MutationTree } from 'vuex'
import { Player } from '~/types'
import { RootState } from '~/store/index'

interface IState {
	loading: boolean
	player: Player|null
	ladder: Player[]
}

export const state = (): IState => ({
	loading: false,
	player: null,
	ladder: [],
})

export const mutations: MutationTree<IState> = {
	SET_LOADING (state: IState, loading: boolean) {
		state.loading = loading
	},
	SET_SELECTED_PLAYER (state: IState, player: Player) {
		state.player = player
	},
	SET_LADDER (state: IState, rankings: Player[]) {
		state.ladder = rankings
	},
}

export const actions: ActionTree<IState, RootState> = {
	RESET ({ commit }) {
		commit('SET_SELECTED_PLAYER', null)
	},
	async SELECT_PLAYER ({ state, commit, dispatch }, id) {
		if (id === state.player?.id) { return }
		commit('SET_LOADING', true)
		dispatch('RESET')
		await dispatch('FETCH_PLAYER', id)
		commit('SET_LOADING', false)
	},
	async FETCH_PLAYER ({ commit }, id) {
		try {
			commit('SET_SELECTED_PLAYER', await this.$strapi.$http.get(`players/${id}/details`).then(response => response.json()))
		} catch (e) { console.log(e) }
	},
	async FETCH_LADDER ({ commit, rootState }) {
		try {
			commit('SET_LADDER', await this.$strapi.find('players', { _limit: 100, _sort: 'power:desc', server: rootState.server }))
		} catch (e) { console.log(e) }
	},
}
