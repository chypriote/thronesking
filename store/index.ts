import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Alliance, Player, Ranking } from '~/types/types'

interface IState {
	players: Ranking[]
	player: Player | null
	player_rankings: Ranking[]

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	players: [],
	player: null,
	player_rankings: [],
	alliances: [],
	alliance: null,
})

export const getters: GetterTree<IState, IState> = {
}

export const mutations: MutationTree<IState> = {
	SET_PLAYERS (state: IState, players: Ranking[]) {
		state.players = players
	},
	SET_PLAYER (state: IState, player: Player|null) {
		state.player = player
	},
	SET_PLAYER_RANKINGS (state: IState, player_rankings: Ranking[]) {
		state.player_rankings = player_rankings
	},
	SET_ALLIANCES (state: IState, alliances: Alliance[]) {
		state.alliances = alliances
	},
	SET_ALLIANCE (state: IState, alliance: Alliance|null) {
		state.alliance = alliance
	},
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_PLAYERS ({ commit }) {
		try {
			commit('SET_PLAYERS', await this.$strapi.find('rankings/ladder'))
		} catch (e) {console.log(e)}
	},
	async FETCH_PLAYER ({ commit }, id) {
		try {
			commit('SET_PLAYER', await this.$strapi.$http.get(`players/informations/${id}`).then(response => response.json()))
		} catch (e) {console.log(e)}
	},
	async FETCH_PLAYER_RANKINGS ({ commit }, id) {
		try {
			commit('SET_PLAYER_RANKINGS',await this.$strapi.find('rankings', {player: id, _sort: 'created_at:asc'}))
		} catch (e) {console.log(e)}
	},

	async FETCH_ALLIANCES ({ commit }) {
		try {
			commit('SET_ALLIANCES', await this.$strapi.find('alliances', {_sort: 'power:desc'}))
		} catch (e) {console.log(e)}
	},
	async FETCH_ALLIANCE ({ commit }, id) {
		try {
			commit('SET_ALLIANCE', await this.$strapi.findOne('alliances', id))
		} catch (e) {console.log(e)}
	},
}
