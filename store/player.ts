import { ActionTree, MutationTree } from 'vuex'
import { Alliance, Hero, Player } from '~/types'

interface IState {
	loading: Boolean
	player: Player | null
	roster: Hero[]
	alliance: Alliance | null
}

export const state = (): IState => ({
	loading: true,
	player: null,
	roster: [],
	alliance: null,
})

export const mutations: MutationTree<IState> = {
	SET_LOADING (state: IState, loading: Boolean) {
		state.loading = loading
	},
	SET_PLAYER (state: IState, player: Player|null) {
		state.player = player
	},
	ADD_HERO_TO_ROSTER (state: IState, hero: Hero) {
		state.roster.push(hero)
	},
	UPDATE_HERO (state: IState, updated: Hero) {
		const hero = state.roster.find(h => h.id === updated.id)
		if (!hero) { return }
		hero.quality = updated.quality
	},
	SET_ROSTER (state: IState, roster: Hero[]) {
		state.roster = roster
	},
	SET_NOTES (state: IState, notes: string) {
		if (!state.player) { return }
		state.player.notes = notes
	},
	SET_PLAYER_FAVORITE (state: IState, favorite: boolean) {
		if (!state.player) { return }
		state.player.favorite = favorite
	},
	SET_ALLIANCE (state: IState, alliance: Alliance|null) {
		state.alliance = alliance
	},
}

export const actions: ActionTree<IState, IState> = {
	RESET ({ commit }) {
		commit('SET_ALLIANCE', null)
		commit('SET_ROSTER', [])
	},
	async FETCH_PLAYER ({ commit }, id) {
		try {
			const player: Player = await this.$strapi.$http.get(`players/${id}/details`).then(response => response.json())
			commit('SET_PLAYER', player)
			commit('SET_ROSTER', player.roster)
			commit('SET_ALLIANCE', player.alliance)
		} catch (e) { console.log(e) }
	},
	async SAVE_NOTES ({ commit, state }, notes: string) {
		try {
			if (!state.player) { return }
			const player = await this.$strapi.update('players', state.player.id.toString(), { notes })
			commit('SET_NOTES', player.notes)
		} catch (e) { console.log(e) }
	},
	async TOGGLE_FAVORITE ({ commit, state }, id) {
		try {
			if (!state.player) { return }
			const player: Player = await this.$strapi.update('players', id, { favorite: !state.player.favorite })
			commit('SET_PLAYER_FAVORITE', player.favorite)
		} catch (e) { console.log(e) }
	},

	async FETCH_ROSTER ({ commit, state }) {
		try {
			if (!state.player) { return }
			commit('SET_ROSTER', await this.$strapi.$http.get(`players/${state.player.id}/roster`).then(response => response.json()))
		} catch (e) { console.log(e) }
	},

	async UPDATE_HERO ({ state, commit }, { hero, quality }) {
		try {
			if (!state.player) { return }
			commit('UPDATE_HERO', await this.$strapi.update('player-heroes', hero.id, { quality }))
		} catch (e) { console.log(e) }
	},
}
