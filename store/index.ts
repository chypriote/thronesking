import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Alliance, Player, KingdomRanking, TourneyRanking } from '~/types'

interface IState {
	players: KingdomRanking[]

	player: Player | null
	kingdom_rankings: KingdomRanking[]
	tourney_rankings: TourneyRanking[]

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	players: [],
	player: null,
	kingdom_rankings: [],
	tourney_rankings: [],
	alliances: [],
	alliance: null,
})

export const getters: GetterTree<IState, IState> = {
}

export const mutations: MutationTree<IState> = {
	SET_PLAYERS (state: IState, players: KingdomRanking[]) {
		state.players = players
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
	async FETCH_PLAYERS ({ commit }) {
		try {
			commit('SET_PLAYERS', await this.$strapi.find('ladders/kingdom'))
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
