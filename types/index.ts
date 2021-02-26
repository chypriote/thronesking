/* eslint-disable no-use-before-define */
export interface Ranking {
	id: number
	date: string
	rank: number
	player: Player
}

export enum RankingTypes {
	KINGDOM_RANK= 'kingdom-rank',
	KINGDOM_POWER= 'kingdom-power',
	TOURNEY_RANK= 'tourney-rank',
	TOURNEY_POINTS= 'tourney-power',
}

export type KingdomRanking = {
	id: number
	date: string
	rank: number
	power: number
	level: number
	player: Player
	alliance: Alliance
}

export type TourneyRanking = {
	id: number
	date: string
	rank: number
	points: number
	ratio: number
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

	alliance_members?: AllianceMembers[]
	player_heroes?: PlayerHeroes[]

	rankings: PlayerRankings
	alliance?: Alliance
	roster?: Hero[]
}
export type PlayerRankings = {
	kingdom: KingdomRanking
	tourney: TourneyRanking
}

export type Hero = {
	id?: number
	name: string
	quality: number
	base: number
	stars: number
	focus: string

	players: Player
	player_heroes: PlayerHeroes
}

export type Alliance = {
	id: number
	aid: number
	name: string
	power: number
	level: number
	reputation: number
	alliance_members: AllianceMembers[]
	members: AllianceMembers[]
}

export type AllianceMembers = {
	id: number
	player: Player
	alliance: Alliance
	active: boolean
	leftAt: string
}

export type PlayerHeroes = {
	id?: number
	player: Player
	hero: Hero
	quality: number
	base: number
}
