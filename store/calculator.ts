import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { cloneDeep, find } from 'lodash-es'
import { Hero, Paragon, QualitySkill } from '~/types/Hero'
import { RootState } from '~/store/index'

export interface LeveledQualitySkill extends QualitySkill {	level: number, unlocked: boolean }
export interface LeveledParagon extends Paragon {	level: number }

export interface IState {
	hero: Hero | null
	skills: LeveledQualitySkill[]
	paragons: LeveledParagon[]
}
export const state = (): IState => ({
	hero: null,
	skills: [],
	paragons: [],
})

export const getters: GetterTree<IState, RootState> = {
	quality: (state: IState) => state.skills.reduce((sum, s) => sum + (s.unlocked ? (s.stars * s.level) : 0), 0),
}

export const mutations: MutationTree<IState> = {
	SET_HERO (state: IState, hero: Hero | null) {
		state.hero = hero
	},
	SET_SKILLS (state: IState, skills: QualitySkill[]) {
		state.skills = skills.map(s => ({ ...s, level: 1, unlocked: !s.unlockable }))
	},
	SET_PARAGONS (state: IState, paragons: Paragon[]) {
		state.paragons = paragons.map(p => ({ ...p, level: 1 }))
	},
	RAISE_SKILL_LEVEL (state, skill: LeveledQualitySkill) {
		const found = find(state.skills, s => s.id === skill.id)
		found ? found.level++ : state.skills.push(skill)
	},
	LOWER_SKILL_LEVEL (state, skill: LeveledQualitySkill) {
		const found = find(state.skills, s => s.id === skill.id)
		found ? found.level-- : state.skills.push(skill)
	},
	SET_ALL_SKILLS_LEVEL (state: IState, level: number) {
		state.skills = state.skills.map(s => ({ ...s, level: s.unlocked ? level : 1 }))
	},
	SET_ALL_SKILLS_LOCK (state: IState, status: boolean) {
		state.skills = state.skills.map(s => ({ ...s, unlocked: s.unlockable ? status : true }))
	},
	UNLOCK_SKILL (state, skill: LeveledQualitySkill) {
		const found = find(state.skills, s => s.id === skill.id)
		if (found) { found.unlocked = true }
	},
}

export const actions: ActionTree<IState, RootState> = {
	LOAD_HERO ({ commit }, hero: Hero) {
		commit('SET_HERO', cloneDeep(hero))
		commit('SET_SKILLS', hero.quality_skills)
		commit('SET_PARAGONS', hero.paragons)
	},
	RESET_ALL_SKILLS ({ commit }) {
		commit('SET_ALL_SKILLS_LEVEL', 1)
		commit('SET_ALL_SKILLS_LOCK', false)
	},
}
