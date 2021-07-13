import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { cloneDeep, find } from 'lodash-es'
import { Attribute, Hero, HeroGroup, Paragon, QualitySkill } from '~/types/Hero'
import { RootState } from '~/store'

export interface LeveledQualitySkill extends QualitySkill {	level: number, unlocked: boolean }
export interface LeveledParagon extends Paragon {	level: number, unlocked: boolean }

export interface IState {
	hero: Hero | null
	skills: LeveledQualitySkill[]
	paragons: LeveledParagon[]
	level: number
}
export const state = (): IState => ({
	hero: null,
	level: 1,
	skills: [],
	paragons: [],
})

export const getters: GetterTree<IState, RootState> = {
	quality: (state: IState) => state.skills.reduce((sum, s) => sum + (s.unlocked ? (s.stars * s.level) : 0), 0),
	military: (state: IState) => state.skills.reduce((sum, s) => sum + (s.unlocked && s.attribute === Attribute.MILITARY ? (s.stars * s.level) : 0), 0),
	fortune: (state: IState) => state.skills.reduce((sum, s) => sum + (s.unlocked && s.attribute === Attribute.FORTUNE ? (s.stars * s.level) : 0), 0),
	provisions: (state: IState) => state.skills.reduce((sum, s) => sum + (s.unlocked && s.attribute === Attribute.PROVISIONS ? (s.stars * s.level) : 0), 0),
	inspiration: (state: IState) => state.skills.reduce((sum, s) => sum + (s.unlocked && s.attribute === Attribute.INSPIRATION ? (s.stars * s.level) : 0), 0),
}

export const mutations: MutationTree<IState> = {
	SET_HERO (state: IState, hero: Hero | null) {
		state.hero = hero
	},
	SET_SKILLS (state: IState, skills: QualitySkill[]) {
		state.skills = skills.map(s => ({ ...s, level: 1, unlocked: !s.unlockable }))
	},
	SET_PARAGONS (state: IState, paragons: Paragon[]) {
		state.paragons = paragons.map(p => ({ ...p, level: 0, unlocked: true }))
	},

	RAISE_HERO_LEVEL (state) {
		state.level++
	},
	LOWER_HERO_LEVEL (state) {
		state.level--
	},
	SET_HERO_LEVEL (state, level) {
		state.level = level
	},

	SET_SKILL_LEVEL (state, skill: LeveledQualitySkill) {
		const level = skill.level <= 350 ? skill.level : 350
		const found = find(state.skills, s => s.id === skill.id)
		if (!found) { return state.skills.push({ ...skill, level }) }
		found.level = level
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

	SET_PARAGON_LEVEL (state, paragon: LeveledParagon) {
		const level = paragon.level <= 350 ? paragon.level : 350
		const found = find(state.paragons, s => s.id === paragon.id)
		if (!found) { return state.paragons.push({ ...paragon, level }) }
		found.level = level
	},
	RAISE_PARAGON_LEVEL (state, paragon: LeveledParagon) {
		const found = find(state.paragons, s => s.id === paragon.id)
		found ? found.level++ : state.paragons.push(paragon)
	},
	LOWER_PARAGON_LEVEL (state, paragon: LeveledParagon) {
		const found = find(state.paragons, s => s.id === paragon.id)
		found ? found.level-- : state.paragons.push(paragon)
	},
}

export const actions: ActionTree<IState, RootState> = {
	async LOAD_HERO ({ commit }, slug: string) {
		const hero = (await this.$strapi.find('heroes', { slug }))[0]
		commit('SET_HERO', hero)
		commit('SET_HERO_LEVEL', 1)
		commit('SET_SKILLS', hero.quality_skills)

		const paragons = cloneDeep(hero.paragons)
		hero.hero_groups.forEach((hg: HeroGroup) => {
			hg.paragons.forEach((p: Paragon) => paragons.push(p))
		})
		commit('SET_PARAGONS', paragons)
	},
	RESET_ALL_SKILLS ({ commit }) {
		commit('SET_ALL_SKILLS_LEVEL', 1)
		commit('SET_ALL_SKILLS_LOCK', false)
	},
}
