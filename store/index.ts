import { ActionTree, MutationTree } from 'vuex'
import { Alliance, Hero, Player } from '~/types'

interface IState {
	players: Player[]
	player: Player | null

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	players: [],
	player: null,

	alliances: [],
	alliance: null,
})

export const mutations: MutationTree<IState> = {
	SET_PLAYERS (state: IState, players: Player[]) {
		state.players = players
	},
	SET_PLAYER (state: IState, player: Player|null) {
		state.player = player
	},
	ADD_HERO_TO_ROSTER (state: IState, hero: Hero) {
		if (!state.player?.roster) { return }
		state.player.roster.push(hero)
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
			commit('SET_PLAYERS', await this.$strapi.find('players', params))
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER ({ commit }, id) {
		try {
			commit('SET_PLAYER', await this.$strapi.$http.get(`players/informations/${id}`).then(response => response.json()))
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
