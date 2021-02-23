import { ActionTree, MutationTree } from 'vuex'
import { TourneyRanking } from '~/types'

interface IState {
	ladder: TourneyRanking[]
	current: TourneyRanking[]
	loading: boolean
	limit: number
	sort: string
	heroes: number|null
	scout: boolean
}

export const state = (): IState => ({
	ladder: [],
	current: [],
	loading: true,
	limit: 100,
	sort: 'points:desc',
	heroes: null,
	scout: false,
})

export const mutations: MutationTree<IState> = {
	SET_LADDER (state: IState, rankings: TourneyRanking[]) {
		state.ladder = rankings
	},
	SET_PLAYER_RANKINGS (state: IState, rankings: TourneyRanking[]) {
		state.current = rankings
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
}
interface Query {
	_limit: number
	_sort: string
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
	async FETCH_LADDER ({ commit, state }) {
		try {
			commit('SET_LOADING', true)
			const query: Query = {
				_limit: state.limit,
				_sort: state.sort,
			}
			if (state.scout) { query['player.player_heroes_null'] = 0 }
			if (state.heroes) { query['player.heroes_gt'] = state.heroes }
			commit('SET_LADDER', await this.$strapi.find('ladders/tourney', query))
			commit('SET_LOADING', false)
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER_RANKINGS ({ commit }, id) {
		try {
			commit('SET_PLAYER_RANKINGS', [])
			commit('SET_PLAYER_RANKINGS', await this.$strapi.find('tourney-rankings', { player: id, _sort: 'created_at:asc' }))
		} catch (e) { console.log(e) }
	},
}
