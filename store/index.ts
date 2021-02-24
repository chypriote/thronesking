import { ActionTree, MutationTree } from 'vuex'
import { Alliance, Hero, Player } from '~/types'

interface IState {
	available_heroes: Hero[]
	players: Player[]
	players_limit: number
	players_sort: string
	players_vip: boolean
	loading: Boolean

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	available_heroes: [],
	players: [],
	players_limit: 1000,
	players_sort: 'gid:asc',
	players_vip: false,
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
	SET_SORT (state: IState, sort: string) {
		state.players_sort = sort
	},
	SET_LIMIT (state: IState, limit: number) {
		state.players_limit = limit || 1000
	},
	SET_VIP (state: IState, vip: boolean) {
		state.players_vip = vip
	},
}

interface IQuery {
	_limit: number
	_sort: string
	vip_eq?: number|null
}
export const actions: ActionTree<IState, IState> = {
	async FETCH_PLAYERS ({ commit, state }, params) {
		try {
			commit('SET_LOADING', true)
			const query: IQuery = {
				_sort: state.players_sort,
				_limit: state.players_limit,
				...params,
			}
			if (state.players_vip) { query.vip_eq = 0 }
			commit('SET_PLAYERS', await this.$strapi.find('players', query))
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

	async SET_SORT ({ commit, dispatch }, value) {
		commit('SET_SORT', value)
		await dispatch('FETCH_PLAYERS')
	},
	async SET_LIMIT ({ commit, dispatch }, value) {
		commit('SET_LIMIT', value)
		await dispatch('FETCH_PLAYERS')
	},
	async SET_VIP ({ dispatch, commit }, vip: boolean) {
		commit('SET_VIP', vip)
		await dispatch('FETCH_PLAYERS')
	},
}
