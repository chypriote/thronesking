import { ActionTree, MutationTree } from 'vuex'
import { Alliance, Player } from '~/types'
import { Hero } from '~/types/Hero'

export const servs = [699, 701, 775, 691, 692, 693, 694, 695, 696, 697, 698]
export enum SERVERS {
	S699= 699,
	S701= 701,
	S775= 775,
	S691= 691,
	S692= 692,
	S693= 693,
	S694= 694,
	S695= 695,
	S696= 696,
	S697= 697,
	S698= 698
}

export interface RootState {
	server: number
	available_heroes: Hero[]
	players: Player[]
	players_limit: number
	players_sort: string
	players_vip: boolean
	players_scout: boolean
	players_favorite: boolean
	players_inactive: boolean
	min_heroes: number
	loading: Boolean

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): RootState => ({
	server: SERVERS.S699,
	available_heroes: [],
	players: [],
	players_limit: 100,
	players_sort: 'gid:asc',
	players_vip: false,
	players_scout: false,
	players_favorite: false,
	players_inactive: false,
	min_heroes: 0,
	loading: true,

	alliances: [],
	alliance: null,
})

export const mutations: MutationTree<RootState> = {
	SET_SERVER (state: RootState, server: SERVERS) {
		state.server = server
	},
	SET_AVAILABLE_HEROES (state: RootState, heroes: Hero[]) {
		state.available_heroes = heroes
	},
	SET_PLAYERS (state: RootState, players: Player[]) {
		state.players = players
	},
	SET_LOADING (state: RootState, loading: Boolean) {
		state.loading = loading
	},
	SET_ALLIANCES (state: RootState, alliances: Alliance[]) {
		state.alliances = alliances
	},
	SET_ALLIANCE (state: RootState, alliance: Alliance|null) {
		state.alliance = alliance
	},
	SET_SORT (state: RootState, sort: string) {
		state.players_sort = sort
	},
	SET_LIMIT (state: RootState, limit: number) {
		state.players_limit = limit || 1000
	},
	SET_VIP (state: RootState, vip: boolean) {
		state.players_vip = vip
	},
	SET_SCOUT (state: RootState, scout: boolean) {
		state.players_scout = scout
	},
	SET_FAVORITE (state: RootState, favorite: boolean) {
		state.players_favorite = favorite
	},
	SET_INACTIVE (state: RootState, inactive: boolean) {
		state.players_inactive = inactive
	},
	SET_MIN_HEROES (state: RootState, heroes: number) {
		state.min_heroes = heroes
	},
}

type IQuery = any & {
	_limit: number
	_sort: string
	vip_eq?: number|null
	favorite?: number
	inactive?: number
	'alliance_members.alliance'?: any
	player_heroes_null?: number
	heroes_gte?: number
}
export const actions: ActionTree<RootState, RootState> = {
	async FETCH_PLAYERS ({ commit, state }, params) {
		try {
			commit('SET_LOADING', true)
			const query: IQuery = {
				_sort: state.players_sort,
				_limit: state.players_limit,
				server: state.server,
				...params,
			}
			if (state.players_vip) { query.vip_eq = 0 }
			if (state.players_favorite) { query.favorite = 1 }
			if (state.players_inactive) { query.inactive = 1 }
			if (state.players_scout) { query.player_heroes_null = 0 }
			if (state.min_heroes) { query.heroes_gte = state.min_heroes }
			if (state.alliance) { query['alliance_members.alliance'] = state.alliance.id }
			commit('SET_PLAYERS', await this.$strapi.find('players', query))
			commit('SET_LOADING', false)
		} catch (e) { console.log(e) }
	},
	async FETCH_ALLIANCES ({ commit, state }) {
		try {
			commit('SET_ALLIANCES', await this.$strapi.find('alliances', { _sort: 'power:desc', server: state.server }))
		} catch (e) { console.log(e) }
	},
	async FETCH_ALLIANCE ({ commit }, id) {
		const [alliance, members] = await Promise.all([
			this.$strapi.findOne('alliances', id),
			this.$strapi.find('alliance-members', { alliance: id, _sort: 'player.power:desc' }),
		])
		try {
			commit('SET_ALLIANCE', { ...alliance, members })
		} catch (e) { console.log(e) }
	},
	async LOAD_HEROES ({ commit }) {
		try {
			commit('SET_AVAILABLE_HEROES', await this.$strapi.find('heroes', { _sort: 'name:asc', _limit: 200 }))
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
	async SET_SCOUT ({ dispatch, commit }, scout: boolean) {
		commit('SET_SCOUT', scout)
		await dispatch('FETCH_PLAYERS')
	},
	async SET_FAVORITE ({ dispatch, commit }, favorite: boolean) {
		commit('SET_FAVORITE', favorite)
		await dispatch('FETCH_PLAYERS')
	},
	async SET_ALLIANCE ({ dispatch, commit }, alliance: Alliance) {
		commit('SET_ALLIANCE', alliance)
		await dispatch('FETCH_PLAYERS')
	},
	async SET_INACTIVE ({ dispatch, commit }, inactive: boolean) {
		commit('SET_INACTIVE', inactive)
		await dispatch('FETCH_PLAYERS')
	},
	async SET_SERVER ({ dispatch, commit }, server: number) {
		commit('SET_SERVER', server)
		await dispatch('FETCH_ALLIANCES')
		await dispatch('FETCH_PLAYERS')
	},
	async SET_MIN_HEROES ({ dispatch, commit }, heroes: number) {
		commit('SET_MIN_HEROES', heroes)
		await dispatch('FETCH_PLAYERS')
	},
}
