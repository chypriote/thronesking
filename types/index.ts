/* eslint-disable no-use-before-define */
import { Hero } from './Hero'

export interface Ranking {
	id: number
	date: string
	rank: number
	player: Player
}

export type Player = {
	id: number
	gid: number
	name: string
	vip: number

	military: number
	fortune: number
	provisions: number
	inspiration: number

	heroes: number
	maidens: number
	children: number
	intimacy: number

	notes: string
	favorite: boolean
	inactive: boolean | null

	alliance_members?: AllianceMember[]
	player_heroes?: PlayerHero[]

	alliance: Alliance | null
	roster?: PlayerHero[]
}

export type Alliance = {
	id: number
	aid: number
	name: string
	battletime: string | Date | null
	power: number
	level: number
	wins: number
	reputation: number
	alliance_members: AllianceMember[]
	members: AllianceMember[]
}

export type AllianceMember = {
	id: number
	player: Player
	alliance: Alliance
	active: boolean
	leftAt: string
}

export type PlayerHero = {
	id?: number
	player: Player
	hero: Hero
	quality: number
	base: number
}
