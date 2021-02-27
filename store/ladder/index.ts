import { ActionTree, MutationTree } from 'vuex'
import { orderBy } from 'lodash-es'
import { KingdomRanking, Player, TourneyRanking } from '~/types'

interface IState {
	loading: boolean
	player: Player|null
	kingdom_rankings: KingdomRanking[]
	tourney_rankings: TourneyRanking[]
}

export const state = (): IState => ({
	loading: false,
	player: null,
	kingdom_rankings: [],
	tourney_rankings: [],
})

export const mutations: MutationTree<IState> = {
	SET_LOADING (state: IState, loading: boolean) {
		state.loading = loading
	},
	SET_SELECTED_PLAYER (state: IState, player: Player) {
		state.player = player
	},
	SET_PLAYER_KINGDOM_RANKINGS (state: IState, rankings: KingdomRanking[]) {
		state.kingdom_rankings = orderBy(rankings, 'date', 'asc')
	},
	SET_PLAYER_TOURNEY_RANKINGS (state: IState, rankings: TourneyRanking[]) {
		state.tourney_rankings = orderBy(rankings, 'date', 'asc')
	},
}

export const actions: ActionTree<IState, IState> = {
	RESET ({ commit }) {
		commit('SET_SELECTED_PLAYER', null)
		commit('SET_PLAYER_KINGDOM_RANKINGS', [])
		commit('SET_PLAYER_TOURNEY_RANKINGS', [])
	},
	async SELECT_PLAYER ({ state, commit, dispatch }, id) {
		if (id === state.player?.id) { return }
		commit('SET_LOADING', true)
		dispatch('RESET')
		await dispatch('FETCH_PLAYER', id)
		commit('SET_LOADING', false)
		await Promise.all([
			dispatch('FETCH_PLAYER_KINGDOM_RANKINGS', id),
			dispatch('FETCH_PLAYER_TOURNEY_RANKINGS', id),
		])
	},
	async FETCH_PLAYER ({ commit }, id) {
		try {
			commit('SET_SELECTED_PLAYER', await this.$strapi.$http.get(`players/${id}/details`).then(response => response.json()))
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER_KINGDOM_RANKINGS ({ commit }, id) {
		try {
			commit('SET_PLAYER_KINGDOM_RANKINGS', [])
			commit('SET_PLAYER_KINGDOM_RANKINGS', await this.$strapi.find('kingdom-rankings', { player: id, _sort: 'date:desc', _limit: 10 }))
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER_TOURNEY_RANKINGS ({ commit }, id) {
		try {
			commit('SET_PLAYER_TOURNEY_RANKINGS', [])
			commit('SET_PLAYER_TOURNEY_RANKINGS', await this.$strapi.find('tourney-rankings', { player: id, _sort: 'date:desc', _limit: 10 }))
		} catch (e) { console.log(e) }
	},
}
