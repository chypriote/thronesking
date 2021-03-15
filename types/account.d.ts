/* eslint-disable no-use-before-define */
import { Hero, Maiden } from '~/types/index'

export type Account = {
	id: number
	name: string
	uid: string

	account_heroes: AccountHero[]
	account_maiden: AccountMaiden[]
}

export type AccountHero = {
	id: number
	level: number
	hero: Hero
	account: Account

	quality: number

	military: number
	fortune: number
	provisions: number
	inspiration: number

	xp_quality: number
	xp_tourney: number

	ferocity: number
	brutality: number
	senior: number
	military_quality: number
}

export type AccountMaiden = {
	id: number
	maiden: Maiden
	account: Account

	intimacy: number
	charm: number
	experience: number
}
