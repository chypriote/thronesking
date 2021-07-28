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
interface Item {
	id: number
	name: string
	picture: any
}
interface HeroFrame {
	summon: number
	bronze: number
	silver: number
	gold: number
	emerald: number
	diamond: number
	item: Item
}
export type Hero = {
	id: number
	hid: number
	name: string
	slug: string
	quality: number
	base: number
	stars: number
	focus: Attribute
	second_focus: Attribute
	hero: number
	picture: any

	hero_group: HeroGroup
	maiden: Maiden
	quality_skills: QualitySkill[]
	paragons: Paragon[]
	skins: Skin[]
	frame: HeroFrame

	player_heroes: PlayerHero[]
	account_heroes: AccountHero[]
}

export type HeroGroup = {
	name: string
	heroes: Hero[]
	attribute: Attribute
	paragons: Paragon[]
}

export type Maiden = {
	id?: number
	mid: number
	name: string
	slug: string
	naughty: number
	picture: any
	naughty_picture: any

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
	description: string

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
	picture: any
	naughty_picture: any

	quality_skill: QualitySkill | number | null
	hero: Hero | number | null
	maiden: Maiden | number | null
}
