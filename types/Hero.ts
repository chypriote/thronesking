import { AccountHero } from './account'
import { PlayerHero } from '.'

/* eslint-disable no-use-before-define */
export enum Attribute {
	MILITARY = 'military',
	FORTUNE = 'fortune',
	PROVISIONS = 'provisions',
	INSPIRATION = 'inspiration',
	BALANCED = 'balanced',
}
export enum Rarity {
	RARE = 'rare',
	LEGENDARY = 'legendary',
}

export type Hero = {
	id: number
	hid: number
	name: string
	quality: number
	base: number
	stars: number
	focus: Attribute
	second_focus: Attribute
	hero: number

	hero_groups: HeroGroup[]
	maiden: Maiden
	quality_skills: QualitySkill[]
	paragons: Paragon[]
	skins: Skin[]

	player_heroes: PlayerHero[]
	account_heroes: AccountHero[]
}

export type HeroGroup = {
	name: string
	heroes: Hero[]
	attribute: Attribute
}

export type Maiden = {
	id?: number
	mid: number
	name: string
	naughty: number

	hero: Hero
}

export type QualitySkill = {
	id?: number
	sid?: number
	name: string
	attribute: Attribute
	stars: number
	unlockable: boolean
}

export type Paragon = {
	id?: number
	pid?: number
	name: string

	cost: number
	item: string
	levels: number

	military: number
	fortune: number
	provisions: number
	inspiration: number
}

export type Skin = {
	id: number
	name: string
	rarity: Rarity
	picture: string

	quality_skill: QualitySkill | number | null
	hero: Hero | number | null
	maiden: Maiden | number | null
}
