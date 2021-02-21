import { ActionTree, MutationTree } from 'vuex'
import { Alliance, Player, KingdomRanking, TourneyRanking } from '~/types'

interface IState {
	kingdom_ladder: KingdomRanking[]
	tourney_ladder: TourneyRanking[]

	player: Player | null
	kingdom_rankings: KingdomRanking[]
	tourney_rankings: TourneyRanking[]

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	kingdom_ladder: [],
	tourney_ladder: [],

	player: null,
	kingdom_rankings: [],
	tourney_rankings: [],

	alliances: [],
	alliance: null,
})

export const mutations: MutationTree<IState> = {
	SET_KINGDOM_LADDER (state: IState, players: KingdomRanking[]) {
		state.kingdom_ladder = players
	},
	SET_TOURNEY_LADDER (state: IState, players: TourneyRanking[]) {
		state.tourney_ladder = players
	},

	SET_PLAYER (state: IState, player: Player|null) {
		state.player = player
	},
	SET_PLAYER_KINGDOM_RANKINGS (state: IState, kingdom_rankings: KingdomRanking[]) {
		state.kingdom_rankings = kingdom_rankings
	},
	SET_PLAYER_TOURNEY_RANKINGS (state: IState, tourney_rankings: TourneyRanking[]) {
		state.tourney_rankings = tourney_rankings
	},

	SET_ALLIANCES (state: IState, alliances: Alliance[]) {
		state.alliances = alliances
	},
	SET_ALLIANCE (state: IState, alliance: Alliance|null) {
		state.alliance = alliance
	},
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_KINGDOM_LADDER ({ commit }) {
		try {
			commit('SET_KINGDOM_LADDER', await this.$strapi.find('ladders/kingdom'))
		} catch (e) { console.log(e) }
	},
	async FETCH_TOURNEY_LADDER ({ commit }) {
		try {
			commit('SET_TOURNEY_LADDER', await this.$strapi.find('ladders/tourney'))
		} catch (e) { console.log(e) }
	},

	async FETCH_PLAYER ({ commit }, id) {
		try {
			commit('SET_PLAYER', await this.$strapi.$http.get(`players/informations/${id}`).then(response => response.json()))
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER_KINGDOM_RANKINGS ({ commit }, id) {
		try {
			commit('SET_PLAYER_KINGDOM_RANKINGS', await this.$strapi.find('kingdom-rankings', { player: id, _sort: 'created_at:asc' }))
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER_TOURNEY_RANKINGS ({ commit }, id) {
		try {
			commit('SET_PLAYER_TOURNEY_RANKINGS', await this.$strapi.find('tourney-rankings', { player: id, _sort: 'created_at:asc' }))
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
}
