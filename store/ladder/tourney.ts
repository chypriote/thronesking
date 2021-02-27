import { ActionTree, MutationTree } from 'vuex'
import { TourneyRanking } from '~/types'

interface IState {
	ladder: TourneyRanking[]
	loading: boolean
	limit: number
	sort: string
	heroes: number|null
	scout: boolean
	favorite: boolean
	inactive: boolean
}

export const state = (): IState => ({
	ladder: [],
	loading: true,
	limit: 100,
	sort: 'points:desc',
	heroes: null,
	scout: false,
	favorite: false,
	inactive: false,
})

export const mutations: MutationTree<IState> = {
	SET_LADDER (state: IState, rankings: TourneyRanking[]) {
		state.ladder = rankings
	},
	SET_LOADING (state: IState, loading: boolean) {
		state.loading = loading
	},
	SET_LIMIT (state: IState, limit: number) {
		state.limit = limit
	},
	SET_SORT (state: IState, sort: string) {
		state.sort = sort
	},
	SET_MIN_HEROES (state: IState, heroes: number|null) {
		state.heroes = heroes
	},
	SET_SCOUT (state: IState, scout: boolean) {
		state.scout = scout
	},
	SET_FAVORITE (state: IState, favorite: boolean) {
		state.favorite = favorite
	},
	SET_INACTIVE (state: IState, inactive: boolean) {
		state.inactive = inactive
	},
}
interface Query {
	_limit: number
	_sort: string
	'player.favorite'?: number
	'player.inactive'?: number
	'player.heroes_gt'?: number|null
	'player.player_heroes_null'?: number
}
export const actions: ActionTree<IState, IState> = {
	async SET_LIMIT ({ dispatch, commit }, limit: number) {
		commit('SET_LIMIT', limit)
		await dispatch('FETCH_LADDER')
	},
	async SET_SORT ({ dispatch, commit }, sort: string) {
		commit('SET_SORT', sort)
		await dispatch('FETCH_LADDER')
	},
	async SET_MIN_HEROES ({ dispatch, commit }, heroes: number|null) {
		commit('SET_MIN_HEROES', heroes)
		await dispatch('FETCH_LADDER')
	},
	async SET_SCOUT ({ dispatch, commit }, scout: boolean) {
		commit('SET_SCOUT', scout)
		await dispatch('FETCH_LADDER')
	},
	async SET_FAVORITE ({ dispatch, commit }, favorite: boolean) {
		commit('SET_FAVORITE', favorite)
		await dispatch('FETCH_LADDER')
	},
	async SET_INACTIVE ({ dispatch, commit }, inactive: boolean) {
		commit('SET_INACTIVE', inactive)
		await dispatch('FETCH_LADDER')
	},
	async FETCH_LADDER ({ commit, state }) {
		try {
			commit('SET_LOADING', true)
			const query: Query = {
				_limit: state.limit,
				_sort: state.sort,
			}
			if (state.scout) { query['player.player_heroes_null'] = 0 }
			if (state.favorite) { query['player.favorite'] = 1 }
			if (state.inactive) { query['player.inactive'] = 1 }
			if (state.heroes) { query['player.heroes_gt'] = state.heroes }
			commit('SET_LADDER', await this.$strapi.find('ladders/tourney', query))
			commit('SET_LOADING', false)
		} catch (e) { console.log(e) }
	},
}
