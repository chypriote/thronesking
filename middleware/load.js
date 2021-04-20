
export default async ({ store }) => {
	await store.dispatch('LOAD_HEROES')
}
