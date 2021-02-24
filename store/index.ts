import { ActionTree, MutationTree } from 'vuex'
import { Alliance, Hero, Player } from '~/types'

interface IState {
	available_heroes: Hero[]
	players: Player[]
	loading: Boolean

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	available_heroes: [],
	players: [],
	loading: true,

	alliances: [],
	alliance: null,
})

export const mutations: MutationTree<IState> = {
	SET_AVAILABLE_HEROES (state: IState, heroes: Hero[]) {
		state.available_heroes = heroes
	},
	SET_PLAYERS (state: IState, players: Player[]) {
		state.players = players
	},
	SET_LOADING (state: IState, loading: Boolean) {
		state.loading = loading
	},
	SET_ALLIANCES (state: IState, alliances: Alliance[]) {
		state.alliances = alliances
	},
	SET_ALLIANCE (state: IState, alliance: Alliance|null) {
		state.alliance = alliance
	},
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_PLAYERS ({ commit }, params) {
		try {
			commit('SET_LOADING', true)
			commit('SET_PLAYERS', await this.$strapi.find('players', { _sort: 'gid:asc', _limit: 1000, ...params }))
			commit('SET_LOADING', false)
		} catch (e) { console.log(e) }
	},
	async FETCH_ALLIANCES ({ commit }) {
		try {
			commit('SET_ALLIANCES', await this.$strapi.find('alliances', { _sort: 'power:desc' }))
		} catch (e) { console.log(e) }
	},
	async FETCH_ALLIANCE ({ commit }, id) {
		const [alliance, members] = await Promise.all([
			this.$strapi.findOne('alliances', id),
			this.$strapi.find('alliance-members', { alliance: id }),
		])
		try {
			commit('SET_ALLIANCE', { ...alliance, members })
		} catch (e) { console.log(e) }
	},
	async LOAD_HEROES ({ commit }) {
		try {
			commit('SET_AVAILABLE_HEROES', await this.$strapi.find('heroes'))
		} catch (e) { console.log(e) }
	},
	async nuxtServerInit ({ dispatch }) {
		await dispatch('LOAD_HEROES')
	},
}
