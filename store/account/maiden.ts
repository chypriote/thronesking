import { ActionTree, MutationTree } from 'vuex'
import { clone } from 'lodash-es'
import { AccountMaiden } from '~/types/account'

export enum Order {
	ASC= 'asc',
	DESC= 'desc',
}
export enum Field {
	NAME= 'name',
	INTIMACY= 'intimacy',
	CHARM= 'charm',
	EXPERIENCE= 'experience',
}
interface IState {
	maidens: AccountMaiden[]
	loading: Boolean
	orders: Order[]
	fields: Field[]
}

export const state = (): IState => ({
	maidens: [],
	loading: false,
	orders: [],
	fields: [],
})

export const mutations: MutationTree<IState> = {
	SET_MAIDENS (state: IState, maidens: AccountMaiden[]) {
		state.maidens = maidens
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
	async FETCH_MAIDENS ({ commit }) {
		try {
			commit('SET_MAIDENS', await this.$strapi.find('account-maidens', { _sort: 'intimacy:desc' }))
		} catch (e) { console.log(e) }
	},
}
