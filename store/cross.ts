import { ActionTree, MutationTree } from 'vuex'
import { clone, map } from 'lodash-es'
import { Alliance } from '~/types'

export enum Order {
	ASC= 'asc',
	DESC= 'desc',
}
export enum Field {
	POWER= 'power',
	NAME= 'name',
	SERVER= 'server',
	WINS= 'wins',
	BATTLETIME= 'battletime',
}

interface IState {
	loading: boolean
	alliance: Alliance|null
	alliances: Alliance[]
	opponent: boolean
	orders: Order[]
	fields: Field[]
}

export const state = (): IState => ({
	loading: false,
	alliance: null,
	alliances: [],
	opponent: false,
	orders: [Order.DESC],
	fields: [Field.POWER],
})

export const mutations: MutationTree<IState> = {
	SET_LOADING (state: IState, loading: boolean) {
		state.loading = loading
	},
	SET_SELECTED_ALLIANCE (state: IState, alliance: Alliance) {
		state.alliance = alliance
	},
	SET_ALLIANCES (state: IState, alliances: Alliance[]) {
		state.alliances = map(alliances, ally => ({
			...ally,
			battletime: ally.battletime ? new Date(ally.battletime) : null,
			power: parseInt(ally.power.toString()),
		}))
	},
	TOGGLE_FIELD (state: IState, field: Field) {
		const index = state.fields.indexOf(field)

		if (index === -1) {
			state.fields.push(field)
			state.orders.push(Order.DESC)
			return
		}
		if (state.orders[index] === Order.DESC) {
			const orders = clone(state.orders)
			orders[index] = Order.ASC
			state.orders = orders
		} else {
			state.orders.splice(index, 1)
			state.fields.splice(index, 1)
		}
	},
	TOGGLE_OPPONENTS (state: IState) {
		state.opponent = !state.opponent
	},
}

export const actions: ActionTree<IState, IState> = {
	RESET ({ commit }) {
		commit('SET_SELECTED_ALLIANCE', null)
		commit('SET_ALLIANCES', [])
	},
	async SELECT_ALLIANCE ({ state, commit, dispatch }, id) {
		if (id === state.alliance?.id) { return }
		commit('SET_LOADING', true)
		dispatch('RESET')
		await dispatch('FETCH_ALLIANCE', id)
		commit('SET_LOADING', false)
		await Promise.all([
			dispatch('FETCH_ALLIANCES', id),
			dispatch('FETCH_ALLIANCE_TOURNEY_RANKINGS', id),
		])
	},
	async FETCH_ALLIANCE ({ commit }, id) {
		try {
			commit('SET_SELECTED_ALLIANCE', await this.$strapi.findOne('alliances', id))
		} catch (e) { console.log(e) }
	},
	async FETCH_ALLIANCES ({ commit }) {
		try {
			commit('SET_ALLIANCES', [])
			commit('SET_ALLIANCES', await this.$strapi.find('alliances', { cross: true, _sort: 'power:desc' }))
		} catch (e) { console.log(e) }
	},
}
