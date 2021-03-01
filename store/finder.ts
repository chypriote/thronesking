import { ActionTree, MutationTree } from 'vuex'
import { Player } from '~/types'

interface IState {
	players: Player[]
	quality: number|null
	loading: Boolean
}

export const state = (): IState => ({
	players: [],
	quality: null,
	loading: false,
})

export const mutations: MutationTree<IState> = {
	SET_RECOMMENDATIONS (state: IState, players: Player[]) {
		state.players = players
	},
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_RECOMMENDATIONS ({ commit }, payload) {
		try {
			commit('SET_RECOMMENDATIONS', await this.$strapi.$http.get(`/opponents/${payload.quality}?${new URLSearchParams(payload.params).toString()}`).then(response => response.json()))
		} catch (e) { console.log(e) }
	},
}
