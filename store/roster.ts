import { ActionTree, MutationTree } from 'vuex'
import { clone } from 'lodash-es'
import { OwnedHero } from '~/types'

export enum Order {
	ASC= 'asc',
	DESC= 'desc',
}
export enum Field {
	QUALITY= 'quality',
	NAME= 'name',
	LEVEL= 'level',
	MILITARY= 'military',
	FORTUNE= 'fortune',
	PROVISIONS= 'provisions',
	INSPIRATION= 'inspiration',
	BRUTALITY= 'brutality',
	FEROCITY= 'ferocity',
	XP_QUALITY= 'xp_quality',
	XP_TOURNEY= 'xp_tourney',
}
interface IState {
	heroes: OwnedHero[]
	loading: Boolean
	orders: Order[]
	fields: Field[]
}

export const state = (): IState => ({
	heroes: [],
	loading: false,
	orders: [Order.DESC],
	fields: [Field.QUALITY],
})

export const mutations: MutationTree<IState> = {
	SET_ROSTER (state: IState, heroes: OwnedHero[]) {
		state.heroes = heroes.map(h => ({
			...h,
			military: parseInt(h.military.toString()),
			fortune: parseInt(h.fortune.toString()),
			provisions: parseInt(h.provisions.toString()),
			inspiration: parseInt(h.inspiration.toString()),
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
}

export const actions: ActionTree<IState, IState> = {
	async FETCH_ROSTER ({ commit }) {
		try {
			commit('SET_ROSTER', await this.$strapi.find('owned-heroes', { _sort: 'quality:desc' }))
		} catch (e) { console.log(e) }
	},
}
