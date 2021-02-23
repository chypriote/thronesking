import { ActionTree, MutationTree } from 'vuex'
import { Alliance, Hero, Player } from '~/types'

interface IState {
	players: Player[]
	player: Player | null
	loading: Boolean

	alliances: Alliance[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	players: [],
	player: null,
	loading: true,

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
	SET_LOADING (state: IState, loading: Boolean) {
		state.loading = loading
	},
	ADD_HERO_TO_ROSTER (state: IState, hero: Hero) {
		if (!state.player?.roster) { return }
		state.player.roster.push(hero)
	},
	SET_ROSTER (state: IState, roster: Hero[]) {
		if (!state.player?.roster) { return }
		state.player.roster = roster
	},
	SET_NOTES (state: IState, notes: string) {
		if (!state.player) { return }
		state.player.notes = notes
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
			commit('SET_PLAYERS', await this.$strapi.find('players', params))
			commit('SET_LOADING', false)
		} catch (e) { console.log(e) }
	},
	async FETCH_PLAYER ({ commit }, id) {
		try {
			commit('SET_PLAYER', await this.$strapi.$http.get(`players/${id}/informations`).then(response => response.json()))
		} catch (e) { console.log(e) }
	},
	async REFRESH_HEROES ({ commit, state }) {
		try {
			if (!state.player) { return }
			commit('SET_ROSTER', await this.$strapi.$http.get(`players/${state.player.id}/roster`).then(response => response.json()))
		} catch (e) { console.log(e) }
	},
	async SAVE_NOTES ({ commit, state }, notes: string) {
		try {
			if (!state.player) { return }
			const player = await this.$strapi.update('players', state.player.id, { notes })
			commit('SET_NOTES', player.notes)
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
